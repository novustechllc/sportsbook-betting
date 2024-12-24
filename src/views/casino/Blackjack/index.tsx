import { Component } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import $ from 'jquery';

import config from 'config';

import { store } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { resultPopup } from 'utils/games';

import Card from './Card';
import Deal from './Deal';
import Player from './Player';
import { deck, PropsType } from './Model';

interface StateType {
    insurance: boolean;
    isRender: boolean;
    isStart: boolean;
    isSplitB: boolean;
    isDouble: boolean;
    gameData: any;
    auth: any;
    currency: any;
    amount: number | string;
}

class Blackjack extends Component<PropsType, StateType> {
    player: any;

    split: any;

    dealer: any;

    deal: any;

    blackjack: any;

    splitted: any;

    constructor(props: PropsType) {
        super(props);
        this.state = {
            insurance: false,
            isRender: false,
            isStart: false,
            isSplitB: false,
            isDouble: false,
            gameData: {},
            auth: {},
            currency: {
                maxBet: 100000,
                minBet: 1000,
                symbol: 'MBT',
                icon: ''
            },
            amount: 1000
        };
    }

    componentDidUpdate = (prevProps: any, prevState: any) => {
        const { auth } = this.state;
        const state = store.getState() as any;
        if (state.auth !== auth || state.auth.isLoggedIn !== auth.isLoggedIn) {
            this.setState({ auth: state.auth, currency: state.auth.currency, amount: state.auth.currency.minBet });
        }
    };

    newGame = (callback: Function) => {
        this.resetBoard();
        const me = this;
        this.sendTurn({ type: 'info' }, ({ betting }: any) => {
            setTimeout(() => {
                this.deal.dealCard(this.player, this.formatDeal(betting.player[0]));
                setTimeout(() => {
                    this.deal.dealCard(this.dealer, this.formatDeal(betting.dealer));
                    setTimeout(() => {
                        this.deal.dealCard(this.player, this.formatDeal(betting.player[1]));
                        setTimeout(() => {
                            this.deal.dealCard(this.dealer, { index: 0, rank: '', suit: '', value: 0, type: 'down' }, true);
                            callback();
                            if (betting.player[0].blackjackValue === betting.player[1].blackjackValue) {
                                me.setState({ isSplitB: true });
                            } else {
                                me.setState({ isSplitB: false });
                            }
                        }, 500);
                    }, 500);
                }, 500);
            });
        });
    };

    resetBoard = () => {
        $('#dhand').html('');
        $('#phand').html('');
        $('#shand').html('');
        $('.blackjack-label, .split-label, .dealer, .player, .split').fadeOut('fast');
        $('.insurance, .arrowContainer, .blackjack-split').fadeOut('fast');
        this.setState({ isDouble: true });
        this.player.resetHand();
        this.dealer.resetHand();
        this.split.resetHand();
    };

    renderCard = (ele: any, sender: any, item: any, isHiddenByServer: any, secretRevealOptions: any) => {
        let hand;
        let i;
        let card: any;
        if (!item) {
            hand = sender.getHand();
            i = hand.length - 1;
            card = new Card(hand[i]);
        } else {
            hand = this.dealer.getHand();
            card = new Card(hand[1]);
        }
        if (secretRevealOptions !== undefined) {
            card.rank = secretRevealOptions.rank;
            card.suit = secretRevealOptions.suit;
            card.value = secretRevealOptions.value;
            card.type = 'up';
            this.dealer.getHand()[1] = card;
        }
        const rank = card.getRank();
        const suit = card.getSuit();
        const type = card.getType();
        let posx = 0;
        let speed = 200;
        let cards = `${ele} .card-${i}`;
        setTimeout(() => $('.blackjack-label').fadeIn('fast'), 100);
        if (i && i > 0) posx -= 50 * i;
        if (!item) {
            $(ele).append(
                `<Box class='${isHiddenByServer === true ? 'dealerSecret ' : ''}blackjack-card card-${i} ${type}'>
                    <span class='pos-0${suit === 'diamonds' || suit === 'hearts' ? ' text-danger' : ''}'>
                        <span class='rank'>&nbsp;</span>
                        <span class='suit'>&nbsp;</span>
                    </span>
                </Box>`
            );
            if (ele === '#phand') {
                speed = 500;
                $(`${ele} .card-${i}`).attr('id', `pcard-${i}`);
                if (hand.length < 2)
                    setTimeout(() => this.player.getScore((score: string) => $('.player').html(score).fadeIn('fast')), 500);
            } else if (ele === '#shand') {
                speed = 500;
                $(`${ele} .card-${i}`).attr('id', `scard-${i}`);
                if (hand.length < 2) setTimeout(() => this.player.getScore((score: string) => $('.split').html(score).fadeIn('fast')), 500);
            } else if (ele === '#dhand') {
                $(`${ele} .card-${i}`).attr('id', `dcard-${i}`);
                if (hand.length < 2)
                    setTimeout(() => this.dealer.getScore((score: string) => $('.dealer').html(score).fadeIn('fast')), 100);
            }
            if (ele && i && posx && speed)
                $(`${ele} .card-${i}`).css({ 'z-index': i, top: -200, left: 500 }).animate({ top: 0, left: posx }, speed);
        } else {
            cards = item;
        }
        if (type === 'up' || item) {
            if (secretRevealOptions === undefined) {
                $(cards).find('span.rank').html(rank);
                $(cards)
                    .find('span.suit')
                    .html(`<i class='${deck.toIcon(deck[card.getIndex()])}'></i>`);
            } else {
                $('.dealerSecret span.rank').html(secretRevealOptions.rank);
                $('.dealerSecret span.suit').html(`<i class='${deck.toIcon(deck[card.getIndex()])}'></i>`);
            }
        }
    };

    hit = () => {
        this.setState({ isDouble: false });
        this.player.hit();
    };

    stand = (params: any) => {
        this.player.stand(params);
    };

    double = () => {
        this.player.double();
    };

    prfSplit = () => {
        this.player.split();
    };

    callback = () => {
        const { amount, currency, isStart } = this.state;
        const betAmount = Number(amount);
        if (betAmount >= currency.minBet && betAmount <= currency.maxBet) {
            if (this.isGameStarted()) {
                if (isStart) return;
                this.setState({ isStart: true });
                this.newGame(() => this.setState({ isRender: true }));
            }
        } else {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
        }
    };

    formatDeal = (data: any) => ({
        index: data.index + 1,
        rank: data.value,
        suit: data.type,
        value: data.blackjackValue,
        type: 'up'
    });

    sendTurn = (params: any, callback: Function) => {
        const state = store.getState() as any;
        if (!state.auth.isLoggedIn) return;
        const { amount, auth, gameData } = this.state;
        if (params.type === 'info') {
            this.splitted = false;
            Axios.post('api/v2/games/turn', {
                userId: auth.user?._id,
                currency: auth.currency?._id,
                gameId: 'blackjack',
                amount,
                type: params.type
            })
                .then((res) => {
                    this.setState({ gameData: res.data });
                    callback(res.data);
                })
                .catch(() => {
                    this.setState({ isStart: false });
                });
        } else if (params.type === 'stand') {
            Axios.post('api/v2/games/turn', {
                userId: auth.user._id,
                betId: gameData._id,
                gameId: 'blackjack',
                auto: params.auto,
                type: params.type
            }).then((res) => {
                if (res.data.type === 'finish') {
                    if (res.data.split) {
                        resultPopup(res.data.split);
                        setTimeout(() => {
                            $('.arrowSplit').fadeOut('fast');
                            $('.arrowPlayer').fadeIn('fast');
                            resultPopup(res.data.player);
                            setTimeout(() => {
                                $('.arrowPlayer').fadeOut('fast');
                            }, 1000);
                        }, 1500);
                    } else {
                        resultPopup(res.data);
                    }
                }
                callback(res.data);
            });
        } else if (params.type === 'hit' || params.type === 'double' || params.type === 'split') {
            Axios.post('api/v2/games/turn', {
                userId: auth.user._id,
                betId: gameData._id,
                gameId: 'blackjack',
                type: params.type
            }).then((res) => {
                if (res.data.type === 'finish') resultPopup(res.data);
                callback(res.data);
            });
        } else if (params.type === 'insurance') {
            Axios.post('api/v2/games/turn', {
                userId: auth.user._id,
                betId: gameData._id,
                gameId: 'blackjack',
                type: params.type,
                bet: params.bet
            }).then((res) => {
                callback(res.data);
            });
        }
    };

    chain = (times: any, ms: any, callback: Function) => {
        let i = 0;
        const next = () => {
            if (i < times) {
                setTimeout(() => {
                    callback(i);
                    next();
                }, ms);
                i += 1;
            }
        };
        next();
    };

    finishExtended = () => {
        this.setState({ isStart: false, isRender: false });
    };

    isGameStarted = () => {
        const { isStart } = this.state;
        return isStart === false;
    };

    insuranceHandler = (bet: any) => {
        const { insurance } = this.state;
        this.setState({ insurance: !insurance });
        this.sendTurn({ type: 'insurance', bet }, (res: any) => {
            if (res.betting.error) console.log('general.error.invalid_wager');
            console.log('general.insurance_success');
        });
    };

    componentDidMount = () => {
        this.deal = new Deal(this);
        this.dealer = new Player(this, '#dhand', '.dealer');
        this.player = new Player(this, '#phand', '.player');
        this.split = new Player(this, '#shand', '.split');
        setTimeout(() => this.resetBoard(), 1000);
        const { auth } = store.getState() as any;
        this.setState({ auth, currency: auth.currency, amount: auth.currency.minBet });
    };

    render() {
        const { amount, currency, isRender, isStart, isDouble, isSplitB, auth, insurance } = this.state;
        return (
            <Stack className="game-container game-blackjacks" direction="row">
                <Stack sx={{ boxShadow: config.boxShadow, p: 2, width: '300px' }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>
                            <FormattedMessage id="Bet Amount" />
                        </Typography>
                        {/* <Typography>${toNumber(Number(amount) * currency.price, 5, true)}</Typography> */}
                    </Stack>
                    <OutlinedInput
                        id="amount"
                        size="small"
                        type="number"
                        sx={{
                            boxShadow: config.boxShadow,
                            width: '100%',
                            borderRadius: 1,
                            mt: 1,
                            pr: 0,
                            '& fieldset': {
                                borderWidth: '2px',
                                borderRadius: 1,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }
                        }}
                        value={amount || ''}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                        endAdornment={
                            <InputAdornment position="end">
                                <img width="16px" src={currency?.icon} alt="icon" style={{ marginRight: '5px' }} />
                                <Stack direction="row" spacing={0.5} px={1}>
                                    <Button
                                        sx={{
                                            background: '#343c5b',
                                            width: '25px',
                                            height: '25px',
                                            minWidth: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        onClick={() => this.setState({ amount: Number(amount) / 2 })}
                                    >
                                        ½
                                    </Button>
                                    <Button
                                        sx={{
                                            background: '#343c5b',
                                            width: '25px',
                                            height: '25px',
                                            minWidth: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        onClick={() => this.setState({ amount: Number(amount) * 2 })}
                                    >
                                        2×
                                    </Button>
                                </Stack>
                            </InputAdornment>
                        }
                    />
                    {insurance ? (
                        <Stack mt={1}>
                            <Typography variant="h2" textAlign="center">
                                <FormattedMessage id="Insurance?" />
                            </Typography>
                            <Stack justifyContent="space-around">
                                <Button className="game-sidebar-button" color="primary" onClick={() => this.insuranceHandler(true)}>
                                    <FormattedMessage id="Accept" />
                                </Button>
                                <Button className="game-sidebar-button" color="error" onClick={() => this.insuranceHandler(false)}>
                                    <FormattedMessage id="Decline" />
                                </Button>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: '100px', mt: 1 }}
                                onClick={() => this.stand(false)}
                                disabled={!isRender || !isStart}
                            >
                                <FormattedMessage id="Stand" />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: '100px', mt: 1 }}
                                onClick={this.hit}
                                disabled={!isRender || !isStart}
                            >
                                <FormattedMessage id="Hit" />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: '100px', mt: 1 }}
                                onClick={this.double}
                                disabled={!isRender || !isDouble}
                            >
                                <FormattedMessage id="Double" />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: '100px', mt: 1 }}
                                onClick={this.prfSplit}
                                disabled={!isRender || !isSplitB}
                            >
                                <FormattedMessage id="Split" />
                            </Button>
                        </Stack>
                    )}
                    {auth && auth.isLoggedIn ? (
                        <Button fullWidth disabled={isStart} variant="contained" color="primary" sx={{ mt: 1 }} onClick={this.callback}>
                            <FormattedMessage id="Bet" />
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            disabled={isStart}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() => store.dispatch(ChangePage('login'))}
                        >
                            <FormattedMessage id="Sign in" />
                        </Button>
                    )}
                </Stack>
                <Stack
                    sx={{
                        background: '#181D2D',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box className="game-content game-content-blackjack">
                        <i className="fas fa-blackjack-ribbon ignoresUpdates" />
                        <Box className="deck">
                            <Box>
                                <Box />
                            </Box>
                            <Box>
                                <Box />
                            </Box>
                            <Box>
                                <Box />
                            </Box>
                            <Box>
                                <Box />
                            </Box>
                        </Box>
                        <Box className="blackjack">
                            <Box className="blackjack-label">
                                <FormattedMessage id="Dealer" />
                            </Box>
                            <Box id="dhand" />
                            <Box className="blackjack-score dealer" />
                        </Box>
                        <Box className="blackjack">
                            <Box className="blackjack-label">
                                <FormattedMessage id="Player" />
                            </Box>
                            <Box id="phand" />
                            <Box className="blackjack-score player" />
                            <Box className="arrowContainer arrowPlayer">
                                <Box className="arrow">
                                    <Box />
                                </Box>
                                <Box className="arrow">
                                    <Box />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="blackjack-split">
                            <Box className="split-label">
                                <FormattedMessage id="Split" />
                            </Box>
                            <Box id="shand" />
                            <Box className="blackjack-score split" />
                            <Box className="arrowContainer arrowSplit">
                                <Box className="arrow">
                                    <Box />
                                </Box>
                                <Box className="arrow">
                                    <Box />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        );
    }
}

export default Blackjack;
