import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import gsap from 'gsap';

import config, { BASE_URL } from 'config';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { chain, Random, resultPopup } from 'utils/games';

const Diamonds = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number | string>('');

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        clear();
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'diamonds',
            userId: user._id,
            currency: currency._id,
            amount
        })
            .then(({ data }) => {
                chain(5, 200, (i: number) => {
                    setDiamond(i, data.color[i - 1], $.grep(data.color, (e) => e === data.color[i - 1]).length >= 2);
                    if (i === 5) {
                        setLoading(false);
                        resultPopup(data);
                    }
                });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const setDiamond = (slot: number, color: string, highlight: boolean) => {
        $('.game-container')
            .find(`[data-diamonds-slot='${slot}']`)
            .addClass('dropShadow')
            .addClass(highlight ? color : '')
            .append(`<img src='${BASE_URL}/diamonds/${color}.svg' alt>`)
            .hide()
            .fadeIn(300);

        const down = () => {
            gsap.to(`[data-diamonds-slot='${slot}'] img`, {
                duration: 0.45,
                y: '+=4px',
                rotate: 0.2 + Random(1, 2) / 10,
                ease: 'sine.out',
                onComplete: up
            });
            gsap.to(`[data-shadow-id='${slot}']`, {
                scale: 0.95,
                duration: 0.45,
                ease: 'sine.out'
            });
        };
        const up = () => {
            gsap.to(`[data-diamonds-slot='${slot}'] img`, {
                duration: 0.4,
                y: '-=4px',
                rotate: 0.1 - Random(1, 2) / 10,
                ease: 'sine.out',
                onComplete: down
            });
            gsap.to(`[data-shadow-id='${slot}']`, {
                scale: 0.9,
                duration: 0.4,
                ease: 'sine.out'
            });
        };
        up();
    };

    const clear = () => {
        gsap.killTweensOf([
            `[data-diamonds-slot='1'] img`,
            `[data-diamonds-slot='2'] img`,
            `[data-diamonds-slot='3'] img`,
            `[data-diamonds-slot='4'] img`,
            `[data-diamonds-slot='5'] img`,
            `[data-shadow-id='1']`,
            `[data-shadow-id='2']`,
            `[data-shadow-id='3']`,
            `[data-shadow-id='4']`,
            `[data-shadow-id='5']`
        ]);
        $('.game-container')
            .find(`[data-diamonds-slot]`)
            .attr('class', '')
            .find('img')
            // eslint-disable-next-line
            .fadeOut(300, function () {
                $(this).remove();
            });
    };

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-diamonds"
            sx={{
                flexDirection: 'row',
                '@media (max-width:767px)': {
                    flexDirection: 'column'
                }
            }}
        >
            <Stack
                sx={{
                    boxShadow: config.boxShadow,
                    p: 2,
                    width: '300px',
                    '@media (max-width:767px)': {
                        width: '100%'
                    }
                }}
            >
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
                    onChange={(e) => setAmount(e.target.value)}
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
                                    onClick={() => setAmount(Number(amount) / 2)}
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
                                    onClick={() => setAmount(Number(amount) * 2)}
                                >
                                    2×
                                </Button>
                            </Stack>
                        </InputAdornment>
                    }
                />
                {isLoggedIn ? (
                    <Button disabled={loading} fullWidth variant="contained" color="primary" sx={{ mt: 1 }} onClick={onPlay}>
                        <FormattedMessage id="Bet" />
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => dispatch(ChangePage('login'))}
                    >
                        <FormattedMessage id="Sign in" />
                    </Button>
                )}
            </Stack>
            <Stack
                sx={{
                    background: '#181D2D',
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box className="game-content game-content-diamonds">
                    <Box className="diamonds-grid">
                        <Box data-diamonds-slot="1">
                            <Box className="shadow" data-shadow-id="1" />
                        </Box>
                        <Box data-diamonds-slot="2">
                            <Box className="shadow" data-shadow-id="2" />
                        </Box>
                        <Box data-diamonds-slot="3">
                            <Box className="shadow" data-shadow-id="3" />
                        </Box>
                        <Box data-diamonds-slot="4">
                            <Box className="shadow" data-shadow-id="4" />
                        </Box>
                        <Box data-diamonds-slot="5">
                            <Box className="shadow" data-shadow-id="5" />
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', overflow: 'auto', bottom: 0, width: '100%' }}>
                        <Stack direction="row">
                            <Box className="history history-diamonds">
                                <Box data-m="50.00">
                                    50.00x (0.04%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="5.00">
                                    5.00x (1.25%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="4.00">
                                    4.00x (2.50%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.5 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.5 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="3.00">
                                    3.00x (12.49%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="2.00">
                                    2.00x (18.74%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.5 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.5 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="0.10">
                                    0.10x (49.98%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 1 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="history history-diamonds">
                                <Box data-m="0.00">
                                    0.00x (14.99%)
                                    <Box>
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                        <i className="fas fa-gem" style={{ opacity: 0.2 }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Diamonds;
