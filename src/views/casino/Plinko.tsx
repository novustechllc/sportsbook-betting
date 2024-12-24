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
import { Random, resultPopup } from 'utils/games';

const hex = {
    0: ['#ffc000', '#997300'],
    1: ['#ffa808', '#a16800'],
    2: ['#ffa808', '#a95b00'],
    3: ['#ff9010', '#a95b00'],
    4: ['#ff7818', '#914209'],
    5: ['#ff6020', '#b93500'],
    6: ['#ff4827', '#c01d00'],
    7: ['#ff302f', '#c80100'],
    8: ['#ff1837', '#91071c'],
    9: ['#ff003f', '#990026']
};
const colors = {
    8: [hex[9], hex[7], hex[4], hex[2], hex[0], hex[2], hex[4], hex[7], hex[9]],
    9: [hex[9], hex[7], hex[6], hex[5], hex[2], hex[2], hex[5], hex[6], hex[7], hex[9]],
    10: [hex[9], hex[8], hex[7], hex[5], hex[4], hex[1], hex[4], hex[5], hex[7], hex[8], hex[9]],
    11: [hex[9], hex[8], hex[7], hex[5], hex[4], hex[2], hex[2], hex[4], hex[5], hex[7], hex[8], hex[9]],
    12: [hex[9], hex[8], hex[7], hex[6], hex[5], hex[4], hex[1], hex[4], hex[5], hex[6], hex[7], hex[8], hex[9]],
    13: [hex[9], hex[8], hex[7], hex[6], hex[5], hex[4], hex[2], hex[2], hex[4], hex[5], hex[6], hex[7], hex[8], hex[9]],
    14: [hex[9], hex[8], hex[7], hex[6], hex[5], hex[4], hex[3], hex[2], hex[3], hex[4], hex[5], hex[6], hex[7], hex[8], hex[9]],
    15: [hex[9], hex[8], hex[7], hex[6], hex[5], hex[4], hex[3], hex[2], hex[2], hex[3], hex[4], hex[5], hex[6], hex[7], hex[8], hex[9]],
    16: [
        hex[9],
        hex[8],
        hex[7],
        hex[6],
        hex[5],
        hex[4],
        hex[3],
        hex[2],
        hex[1],
        hex[2],
        hex[3],
        hex[4],
        hex[5],
        hex[6],
        hex[7],
        hex[8],
        hex[9]
    ]
} as any;
const gameData = {
    low: {
        8: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
        10: [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9],
        12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
        14: [7.1, 4, 1.9, 1.4, 1.3, 1.1, 1, 0.5, 1, 1.1, 1.3, 1.4, 1.9, 4, 7.1],
        16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16]
    },
    medium: {
        8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
        10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
        12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
        14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
        16: [110, 41, 1, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110]
    },
    high: {
        8: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
        10: [76, 10, 3, 0.9, 0.3, 0.2, 0.3, 0.9, 3, 10, 76],
        12: [170, 24, 8.1, 2, 0.7, 0.3, 0.2, 0.3, 0.7, 2, 8.1, 24, 170],
        14: [420, 56, 18, 5, 1.9, 0.3, 0.2, 0.1, 0.2, 0.3, 1.9, 5, 18, 56, 420],
        16: [1000, 130, 26, 9, 4, 2, 0.3, 0.2, 0.1, 0.2, 0.3, 2, 4, 9, 26, 130, 1000]
    }
} as any;
const difficulties = ['low', 'medium', 'high'];
const numberPins = [8, 10, 12, 14, 16];
const speed = 300;

const Plinko = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number | string>('');
    const [difficulty, setDifficulty] = useState('low');
    const [pins, setPins] = useState(8);

    const onDifficulty = (event: React.MouseEvent<HTMLElement>, params: string) => {
        setDifficulty(params);
    };

    const onPins = (event: React.MouseEvent<HTMLElement>, params: number) => {
        setPins(params);
    };

    const getDataFromObj = (obj: any) => {
        const step = Math.floor(obj.attr('step'));
        const delta = Math.floor(obj.attr('delta'));
        const target = $('.plinkoContainer .plinko').find(`[row='${step}'][pos='${delta}']`);
        return {
            top: target.css('top'),
            left: target.css('left')
        };
    };

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'plinko',
            userId: user._id,
            currency: currency._id,
            amount: betAmount,
            difficulty,
            pins
        })
            .then(({ data }) => {
                const s = 1 / 3 / (pins + 2);
                const css = {
                    position: 'absolute',
                    top: `${-100 * s}%`,
                    left: '50%',
                    width: `${100 * s}%`,
                    height: `${100 * s}%`,
                    background: `hsl(${Random(0, 360)}, 90%, 60%)`,
                    borderRadius: '50%',
                    animationDuration: `${speed / 1000}s`,
                    transform: 'translate(-50%, -125%)'
                };
                const attr = {
                    step: 0,
                    delta: 0,
                    target: data.target
                };
                const ball = $('<div>').css(css).attr(attr);
                $('.plinkoContainer .plinko').append(ball);
                const animationCallbacks = () => {
                    animationCallback(ball);
                };
                ball.animate(getDataFromObj(ball), speed, animationCallbacks);
                setTimeout(() => {
                    setLoading(false);
                    resultPopup(data);
                }, speed * gameData[difficulty][pins].length + 1000);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const animationCallback = (obj: any) => {
        obj.attr('step', Math.floor(obj.attr('step')) + 1);
        const step = Math.floor(obj.attr('step'));

        if (step !== pins + 1) {
            let heading = Math.random() < 0.5 ? 0 : 1;
            const target = Math.floor(obj.attr('target'));
            const delta = Math.floor(obj.attr('delta'));
            if (delta === target) heading = 0;
            else if (pins - step + 1 === target - delta) heading = 1;

            const pin = $('.plinkoContainer .plinko').find(`[row=${step - 1}][pos=${Math.floor(obj.attr('delta'))}]`);
            pin.addClass('pulsate');
            setTimeout(() => pin.removeClass('pulsate'), 700);

            obj.attr('delta', Math.floor(obj.attr('delta')) + heading);
            obj.removeAttr('heading')
                .delay(speed / 10)
                .queue(() => {
                    obj.attr('heading', heading).dequeue();
                });

            const animationCallbacks = () => {
                animationCallback(obj);
            };
            obj.animate(getDataFromObj(obj), speed, animationCallbacks);
        } else {
            obj.removeAttr('heading')
                .delay(speed / 10)
                .queue(() => {
                    obj.attr('heading', 2).dequeue();
                })
                .delay(speed)
                .queue(() => {
                    obj.remove().dequeue();
                });
        }
    };

    const reset = () => {
        $('.plinkoContainer .plinko').empty();
        for (let i = 0; i <= pins; i += 1) {
            for (let j = 0; j <= i; j += 1) {
                const x = 0.5 + (j - i / 2) / (pins + 2);
                const y = (i + 1) / (pins + 2);
                const s = 1 / (i === pins ? 3 : 5) / (pins + 2);
                const isBucket = i === pins;
                const width = isBucket ? 100 * 2.2 * s : 100 * s;
                const css = {
                    position: 'absolute',
                    top: `${100 * y}%`,
                    left: `${100 * x}%`,
                    width: `${width}%`,
                    height: `${isBucket ? 100 * 1.4 * s : 100 * s}%`,
                    background: isBucket ? colors[pins][j][0] : '#66abf5',
                    'border-bottom': isBucket ? `${width / 2}px solid ${colors[pins][j][1]}` : 'none',
                    borderRadius: isBucket ? '3px' : '50%',
                    transform: 'translate(-50%, -50%)'
                };
                const attr = { row: i, pos: j };
                const e = $('<div>')
                    .css(css)
                    .attr(attr)
                    .addClass(isBucket ? 'bucket' : 'pin');
                if (isBucket) e.html(`x${gameData[difficulty][pins][j]}`);
                $('.plinkoContainer .plinko').append(e);
            }
        }
    };

    useEffect(() => {
        reset();
        // eslint-disable-next-line
    }, [pins, difficulty]);

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-plinko"
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
                <Stack direction="row" justifyContent="space-between" flexWrap="wrap" mt={1}>
                    <ToggleButtonGroup size="small" color="primary" fullWidth exclusive value={difficulty} onChange={onDifficulty}>
                        {difficulties.map((item, key) => (
                            <ToggleButton
                                key={key}
                                value={item}
                                disabled={loading}
                                sx={{
                                    border: '#343c5b solid 2px',
                                    boxShadow: config.boxShadow
                                }}
                            >
                                <FormattedMessage id={item} />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>
                <Stack direction="row" justifyContent="space-between" flexWrap="wrap" mt={1}>
                    <ToggleButtonGroup size="small" color="primary" fullWidth exclusive value={pins} onChange={onPins}>
                        {numberPins.map((item, key) => (
                            <ToggleButton
                                key={key}
                                value={item}
                                disabled={loading}
                                sx={{
                                    border: '#343c5b solid 2px',
                                    boxShadow: config.boxShadow
                                }}
                            >
                                {item}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>
                {isLoggedIn ? (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        disabled={loading || !pins || !difficulty}
                        onClick={onPlay}
                    >
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
                <Box className="game-content game-content-plinko">
                    <Box className="plinkoContainer">
                        <Box className="plinko" />
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default Plinko;
