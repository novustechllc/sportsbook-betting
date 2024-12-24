import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import config from 'config';
import classnames from 'classnames';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { chain, Random, resultPopup } from 'utils/games';

import Gem from 'assets/images/games/gem.svg';

const odds = {
    1: [0, 1.8],
    2: [0, 1.96, 3.6],
    3: [0, 1.1, 1.38, 24],
    4: [0, 0, 2.1, 7.8, 88.6],
    5: [0, 0, 1.5, 4, 12, 292],
    6: [0, 0, 1.1, 1.85, 6, 100, 600],
    7: [0, 0, 1.1, 1.6, 3.2, 14, 200, 700],
    8: [0, 0, 1.1, 1.4, 2, 5, 39, 100, 800],
    9: [0, 0, 1.1, 1.3, 1.6, 2.3, 7, 40, 200, 900],
    10: [0, 0, 1.1, 1.2, 1.3, 1.4, 2.6, 10, 30, 200, 1000]
} as any;

// const odds = {
//     1: [0.4, 2.75],
//     2: [0, 1.8, 5.1],
//     3: [0, 0, 2.8, 50],
//     4: [0, 0, 1.7, 10, 100],
//     5: [0, 0, 1.4, 4, 14, 390],
//     6: [0, 0, 0, 3, 9, 180, 710],
//     7: [0, 0, 0, 2, 7, 30, 400, 800],
//     8: [0, 0, 0, 2, 4, 11, 67, 400, 900],
//     9: [0, 0, 0, 2, 2.5, 5, 15, 100, 500, 1000],
//     10: [0, 0, 0, 1.6, 2, 4, 7, 26, 100, 500, 1000]
// } as any;

const Keno = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number | string>('');
    const [autoPickInProcess, setAutoPickInProcess] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [response, setResponse] = useState<number[]>([]);

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        setResponse([]);
        $('.history-keno').removeClass('highlight');
        Axios.post('api/v2/games/turn', {
            gameId: 'keno',
            userId: user._id,
            currency: currency._id,
            amount: betAmount,
            selected
        })
            .then(({ data }) => {
                let historyIndex = 1;
                $(`.history-keno:nth-child(${historyIndex})`).addClass('highlight');
                chain(10, 100, (i: number) => {
                    setResponse(data.picked.slice(0, i));
                    if (selected.includes(data.picked[i - 1])) {
                        historyIndex += 1;
                        $('.history-keno').removeClass('highlight');
                        $(`.history-keno:nth-child(${historyIndex})`).addClass('highlight');
                    }
                    if (i === 9) {
                        setLoading(false);
                        resultPopup(data);
                    }
                });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const tileClick = (number: number) => {
        if (selected.length >= 10 && !selected.includes(number)) return;
        if (!selected.includes(number)) {
            setSelected([...selected, number]);
        } else {
            setSelected([...selected.filter((e) => e !== number)]);
        }
    };

    const onAutoPick = () => {
        if (autoPickInProcess) return;
        setAutoPickInProcess(true);
        setSelected([]);
        const picked: number[] = [];
        while (picked.length < 10) {
            const rand = Random(1, 40);
            if (!picked.includes(rand)) {
                picked.push(rand);
            }
        }

        chain(10, 100, (index: number) => {
            setSelected(picked.slice(0, index));
            if (index === 9) setAutoPickInProcess(false);
        });
    };

    const onClear = () => {
        $('.history-keno').removeClass('highlight');
        setSelected([]);
        setResponse([]);
    };

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-keno"
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
                <Stack direction="row">
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }} onClick={onAutoPick}>
                        <FormattedMessage id="Auto pick" />
                    </Button>
                    <Box sx={{ width: '10px' }} />
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }} onClick={onClear}>
                        <FormattedMessage id="Clear" />
                    </Button>
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
                <Box className="game-content game-content-keno">
                    <Box className="keno-grid">
                        {Array.from(Array(40).keys()).map((item, key) => (
                            <Box
                                key={key}
                                className={classnames({
                                    active: selected.includes(key + 1),
                                    selected: response.includes(key + 1)
                                })}
                                onClick={() => tileClick(key + 1)}
                            >
                                <img src={Gem} className="w-100" alt="" />
                                <span>{key + 1}</span>
                            </Box>
                        ))}
                    </Box>
                    {selected.length ? (
                        <Box className="game-history">
                            {odds[selected.length].map((item: number, key: number) => (
                                <Box key={key} className="history history-keno">
                                    <Box>{item.toFixed(2)}x</Box>
                                    <Box>
                                        {key} <i className="fas fa-square d-none d-lg-inline-block" />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : null}
                </Box>
            </Stack>
        </Stack>
    );
};

export default Keno;
