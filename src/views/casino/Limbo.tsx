import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import config from 'config';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { resultPopup } from 'utils/games';

import Limbo1 from 'assets/images/games/limbo1.png';
import Limbo2 from 'assets/images/games/limbo2.png';
import Rocket from 'assets/images/games/rocket.png';
import Mountain from 'assets/images/games/mountain.png';

const Limbo = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [multiplier, setMultiplier] = useState<number | string>(2);
    const [amount, setAmount] = useState<number | string>('');
    const [payout, setPayout] = useState(1);

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'limbo',
            userId: user._id,
            currency: currency._id,
            amount: betAmount,
            multiplier
        })
            .then(({ data }) => {
                const win = data.status === 'WIN';
                setPayout(data.payout);
                // eslint-disable-next-line
                $('.counter').each(function () {
                    const size = $(this).text().split('.')[1] ? $(this).text().split('.')[1].length : 0;
                    $(this)
                        .prop('Counter', 0)
                        .animate(
                            { Counter: $(this).text() },
                            {
                                duration: 600,
                                step: (func: any) => {
                                    $(this).text(parseFloat(func).toFixed(size));
                                }
                            }
                        );
                });
                $('.rocket-wrap').addClass('flying');
                $('.rocket-payout').attr('class', 'rocket-payout');
                $('.counter').attr('class', 'counter');
                $('.rocket-wrap').addClass('flying');
                setTimeout(() => {
                    $('.rocket-wrap, .rocket-boom').addClass('boom');
                    resultPopup(data);
                    setTimeout(() => {
                        $('.rocket-payout, .counter').toggleClass('text-danger', !win).toggleClass('text-success', win);
                        $('.rocket-wrap').removeClass('flying').removeClass('boom');
                        $('.rocket-boom').removeClass('boom');
                        setLoading(false);
                    }, 400);
                }, 200);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-limbo"
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
                <Typography sx={{ mt: 1 }}>
                    <FormattedMessage id="Tagert" />
                </Typography>
                <OutlinedInput
                    id="amount"
                    size="small"
                    type="number"
                    sx={{
                        boxShadow: config.boxShadow,
                        width: '100%',
                        borderRadius: 1,
                        mt: 0.5,
                        pr: 0,
                        '& fieldset': {
                            borderWidth: '2px',
                            borderRadius: 1,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }
                    }}
                    value={multiplier || ''}
                    onChange={(e) => setMultiplier(e.target.value)}
                />
                {isLoggedIn ? (
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }} disabled={loading} onClick={onPlay}>
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
                <Box className="game-content game-content-limbo">
                    <Box className="limbo-canvas">
                        <img src={Limbo1} className="cloud cloud-r" alt="" />
                        <img src={Limbo2} className="cloud cloud-d" alt="" />
                        <img src={Limbo1} className="cloud cloud-v" alt="" />
                        <img src={Limbo2} className="cloud cloud-g" alt="" />
                        <img src={Mountain} className="limbo-bg" alt="" />
                        <Box className="bg-star show-1">
                            <Box className="l-star e-r" />
                            <Box className="l-star s-p" />
                            <Box className="l-star r-p" />
                        </Box>
                        <Box className="game-rocket notranslate">
                            <Box className="rocket-number">
                                <span className="rocket-payout">
                                    <span className="counter">{payout.toFixed(2)}</span>x
                                </span>
                                <Box className="rocket-boom" />
                            </Box>
                            <Box className="rocket-wrap fire">
                                <Box className="rocket-img">
                                    <img src={Rocket} alt="" />
                                </Box>
                                <Box className="rocket-fire" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Limbo;
