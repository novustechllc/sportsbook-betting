import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import config from 'config';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { resultPopup } from 'utils/games';

import darkPanel from 'assets/images/games/darkPanel.png';

const Dice = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number | string>('');
    const [mode, setMode] = useState(true);
    const [target, setTarget] = useState(5050);
    const [multiplier, setMultiplier] = useState(2);

    const numberSpin = (selector: string) => {
        const element = document.getElementById(selector) as any;
        const factor = 10 + Math.floor(Math.random() * 10);
        const num = 10;
        const section = 100 / (num + 1);
        let stopValue = 1;
        const spin = (flag: boolean, x: number) => {
            let value = element.style.transform;
            value = value ? parseFloat(value.split('(')[1].split(')').join('')) : 0;
            if (flag && flag === true) {
                const isStop = stopValue === 0 ? 0 : 0.5;
                if (
                    stopValue !== 1 &&
                    (value <= stopValue || value - section / factor <= stopValue) &&
                    typeof x != 'undefined' &&
                    value >= x * -section &&
                    value <= (x - 0.5 >= 0 ? x - 0.5 : isStop) * -section
                ) {
                    element.style.transform = `translateY(${stopValue}%)`;
                    stopValue = 1;
                    return true;
                }
                stopValue = Math.floor(value / section) >= -num ? Math.floor(value / section) * section : 0;
            }
            if (value && value <= -(section * num)) {
                element.style.transform = `translateY(${section}%)`;
                value = 0;
            } else {
                value -= section / factor;
            }
            element.style.transform = `translateY(${value}%)`;
            return false;
        };
        const spinTimer = setInterval(spin, 5);
        function stop(delay: number, x: number) {
            setTimeout(() => {
                clearTimeout(spinTimer);
                const stopTimer = setInterval(() => {
                    if (spin(true, x)) clearInterval(stopTimer);
                }, 5);
            }, delay);
        }
        return {
            stop: (delay: number, x: number) => stop(delay, x)
        };
    };

    const onTarget = (params: number) => {
        setMultiplier(params);
        if (params) {
            if (mode) {
                const pct = 100 / params;
                const odds = pct - pct * 0.01;
                const t = 10000 - Math.ceil((odds / 100) * 10000);
                setTarget(t);
            } else {
                const pct = 100 / params;
                const odds = pct - pct * 0.01;
                const t = Math.ceil((odds / 100) * 10000);
                setTarget(t);
            }
        }
    };

    const onMode = (event: React.MouseEvent<HTMLElement>, params: boolean) => {
        setMode(params);
        if (params) {
            const pct = 100 / multiplier;
            const odds = pct - pct * 0.01;
            const t = 10000 - Math.ceil((odds / 100) * 10000);
            setTarget(t);
        } else {
            const pct = 100 / multiplier;
            const odds = pct - pct * 0.01;
            const t = Math.ceil((odds / 100) * 10000);
            setTarget(t);
        }
    };

    const onPlay = () => {
        $('#scroll1, #scroll2, #scroll3, #scroll4').removeClass('text-danger').removeClass('text-success');
        const betAmount = Number(amount);
        if (multiplier < 1 || multiplier > 2000) {
            snackbar('Invalid odds!');
            return;
        }
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'dice',
            userId: user._id,
            currency: currency._id,
            amount: betAmount,
            multiplier,
            target,
            mode
        })
            .then(({ data }) => {
                let roll = String(data.roll);
                if (roll.length === 3) {
                    roll = `0${roll}`;
                } else if (roll.length === 2) {
                    roll = `00${roll}`;
                } else if (roll.length === 1) {
                    roll = `000${roll}`;
                }
                const array = String(roll).split('');
                numberSpin('scroll1').stop(500 + Math.floor(Math.random() * 100), Number(array[0]));
                numberSpin('scroll2').stop(600 + Math.floor(Math.random() * 100), Number(array[1]));
                numberSpin('scroll3').stop(700 + Math.floor(Math.random() * 100), Number(array[2]));
                numberSpin('scroll4').stop(800 + Math.floor(Math.random() * 100), Number(array[3]));
                setTimeout(() => {
                    const classname = data.status === 'WIN' ? 'text-success' : 'text-danger';
                    $('#scroll1, #scroll2, #scroll3, #scroll4').addClass(classname);
                }, 1500);
                setTimeout(() => {
                    setLoading(false);
                    resultPopup(data);
                }, 2500);
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
            className="game-container game-dice"
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
                    <FormattedMessage id="Odds" />
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
                    onChange={(e) => onTarget(Number(e.target.value))}
                />
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
                            <FormattedMessage id="HIGH" />
                        </ToggleButton>
                        <ToggleButton
                            value={false}
                            disabled={loading}
                            sx={{
                                border: '#343c5b solid 2px',
                                boxShadow: config.boxShadow
                            }}
                        >
                            <FormattedMessage id="LOW" />
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
                <Box className="game-content game-content-dice game-type-local">
                    <Box className="slots">
                        <Box className="target">
                            {mode ? '>' : '<'} {target}
                        </Box>
                        <img src={darkPanel} alt="slot panel" className="slot-panel" />
                        <Box className="slotcontainer">
                            <Box className="slot">
                                <Box id="scroll1">
                                    <Box>0</Box>
                                    <Box>1</Box>
                                    <Box>2</Box>
                                    <Box>3</Box>
                                    <Box>4</Box>
                                    <Box>5</Box>
                                    <Box>6</Box>
                                    <Box>7</Box>
                                    <Box>8</Box>
                                    <Box>9</Box>
                                    <Box>0</Box>
                                </Box>
                            </Box>
                            <Box className="slot">
                                <Box id="scroll2">
                                    <Box>0</Box>
                                    <Box>1</Box>
                                    <Box>2</Box>
                                    <Box>3</Box>
                                    <Box>4</Box>
                                    <Box>5</Box>
                                    <Box>6</Box>
                                    <Box>7</Box>
                                    <Box>8</Box>
                                    <Box>9</Box>
                                    <Box>0</Box>
                                </Box>
                            </Box>
                            <Box className="slot">
                                <Box id="scroll3">
                                    <Box>0</Box>
                                    <Box>1</Box>
                                    <Box>2</Box>
                                    <Box>3</Box>
                                    <Box>4</Box>
                                    <Box>5</Box>
                                    <Box>6</Box>
                                    <Box>7</Box>
                                    <Box>8</Box>
                                    <Box>9</Box>
                                    <Box>0</Box>
                                </Box>
                            </Box>
                            <Box className="slot">
                                <Box id="scroll4">
                                    <Box>0</Box>
                                    <Box>1</Box>
                                    <Box>2</Box>
                                    <Box>3</Box>
                                    <Box>4</Box>
                                    <Box>5</Box>
                                    <Box>6</Box>
                                    <Box>7</Box>
                                    <Box>8</Box>
                                    <Box>9</Box>
                                    <Box>0</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Dice;
