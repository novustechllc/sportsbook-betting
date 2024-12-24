import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import _ from 'lodash';
import config from 'config';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';

import 'utils/superwheel';
import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { resultPopup } from 'utils/games';

const RED = '#f44336';
const BLACK = 'black';
const GREEN = '#8bc34a';
const YELLOW = '#ffeb3b';

const wConfig = {
    width: 360,
    frame: 1,
    type: 'spin',
    duration: 3000,
    line: {
        width: 0,
        color: 'transparent'
    },
    outer: {
        width: 8,
        color: 'rgba(255, 255, 255, 0.1)'
    },
    inner: {
        width: 0,
        color: 'transparent'
    },
    center: {
        width: 90,
        rotate: true
    },
    marker: {
        animate: true
    }
};

const colors1 = [
    { color: BLACK, value: 2 },
    { color: GREEN, value: 14 },
    { color: RED, value: 2 }
];

const colors2 = [
    { color: BLACK, value: 2 },
    { color: RED, value: 3 },
    { color: GREEN, value: 5 },
    { color: YELLOW, value: 50 }
];

const Wheel = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(true);
    const [amount, setAmount] = useState<number | string>('');
    const [color, setColor] = useState('black');

    const fill = (slices: any) => {
        let i = 0;
        const output: any[] = [];
        _.forEach(slices, (slice) => {
            output.push({
                value: i,
                background: slice
            });
            i += 1;
        });
        return output;
    };

    const renderWheel = () => {
        if (mode) {
            const gamewheel = $('.game-wheel').find('.wheel') as any;
            gamewheel.wheel({
                slices: fill([GREEN, RED, BLACK, RED, BLACK, RED, BLACK, RED, BLACK, RED, BLACK, RED, BLACK, RED, BLACK]),
                ...wConfig
            });
        } else if (!mode) {
            const gamewheel = $('.game-wheel').find('.wheel') as any;
            gamewheel.wheel({
                slices: fill([
                    YELLOW,
                    GREEN,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    GREEN,
                    BLACK,
                    GREEN,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    GREEN,
                    BLACK,
                    GREEN,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    GREEN,
                    BLACK,
                    GREEN,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    GREEN,
                    BLACK,
                    GREEN,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    RED,
                    BLACK,
                    GREEN
                ]),
                ...wConfig
            });
        }
    };

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'wheel',
            userId: user._id,
            currency: currency._id,
            amount: betAmount,
            color,
            mode
        })
            .then(({ data }) => {
                const gamewheel = $('.game-wheel .wheel') as any;
                gamewheel.wheel('start', 'value', data.index);
                setTimeout(() => {
                    setLoading(false);
                    resultPopup(data);
                }, 3000);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onMode = (event: React.MouseEvent<HTMLElement>, params: boolean) => {
        setMode(params);
        if (params) {
            setColor(colors1[0].color);
        } else {
            setColor(colors2[0].color);
        }
    };

    const onColor = (event: React.MouseEvent<HTMLElement>, params: string) => {
        setColor(params);
    };

    useEffect(() => {
        renderWheel();
        // eslint-disable-next-line
    }, [mode]);

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-wheel"
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
                    <FormattedMessage id="Color" />
                </Typography>
                <Stack direction="row" justifyContent="space-between" flexWrap="wrap" mt={0.5}>
                    <ToggleButtonGroup size="small" color="primary" fullWidth exclusive value={color} onChange={onColor}>
                        {(mode ? colors1 : colors2).map((item, key) => (
                            <ToggleButton
                                key={key}
                                value={item.color}
                                disabled={loading}
                                sx={{
                                    color: item.color,
                                    border: '#343c5b solid 2px',
                                    boxShadow: config.boxShadow
                                }}
                            >
                                x{item.value.toFixed(2)}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>
                <Typography sx={{ mt: 1 }}>
                    <FormattedMessage id="Game mode" />
                </Typography>
                <Stack direction="row" justifyContent="space-between" flexWrap="wrap" mt={0.5}>
                    <ToggleButtonGroup size="small" color="primary" fullWidth exclusive value={mode} onChange={onMode}>
                        <ToggleButton
                            value
                            disabled={loading}
                            sx={{
                                border: '#343c5b solid 2px',
                                boxShadow: config.boxShadow
                            }}
                        >
                            <FormattedMessage id="Double" />
                        </ToggleButton>
                        <ToggleButton
                            value={false}
                            disabled={loading}
                            sx={{
                                border: '#343c5b solid 2px',
                                boxShadow: config.boxShadow
                            }}
                        >
                            X50
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
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
                <Box className="game-content game-content-wheel">
                    <Box className="wheel-container">
                        <Box className="wheel" />
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Wheel;
