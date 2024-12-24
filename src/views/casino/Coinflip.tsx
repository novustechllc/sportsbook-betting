import { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import gsap from 'gsap';

import config from 'config';

import { ChangePage } from 'store/reducers/menu';
import { useDispatch, useSelector } from 'store';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { resultPopup } from 'utils/games';

const BLUE = 'blue';
const YELLOW = 'yellow';
const colors = [BLUE, YELLOW];

const CoinFlip = () => {
    const dispatch = useDispatch();
    const { user, currency, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number | string>('');
    const [color, setColor] = useState('blue');

    const onPlay = () => {
        const betAmount = Number(amount);
        if (betAmount < Number(currency.minBet) && betAmount > Number(currency.maxBet)) {
            snackbar(`Maximum bet ${currency.maxBet} ${currency.symbol} minimum bet ${currency.minBet} ${currency.symbol}.`);
            return;
        }
        setLoading(true);
        Axios.post('api/v2/games/turn', {
            gameId: 'coinflip',
            userId: user._id,
            currency: currency._id,
            amount,
            color
        })
            .then(({ data }) => {
                const side = data.index;
                $('[data-coin]').attr('class', `coin ${side}`);
                const i = gsap.timeline({
                    onComplete: () => {
                        resultPopup(data);
                        setLoading(false);
                    }
                });
                i.set('.game-content-coinflip', { perspective: 400, transformStyle: 'preserve3d' });
                i.fromTo('[data-coin]', 0.4, { rotationY: -720 }, { rotationY: -190, z: 120, ease: 'easeOut' });
                i.to('[data-coin]', { duration: 0.1, rotationY: -170, ease: 'easeOut' });
                i.to('[data-coin]', { duration: 0.4, rotationY: 0, z: -15, ease: 'easeIn' });
                i.to('[data-coin]', { duration: 0.1, z: 0, ease: 'easeIn' });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleChange = (event: React.MouseEvent<HTMLElement>, param: string) => {
        setColor(param);
    };

    useEffect(() => {
        if (currency?.minBet) {
            setAmount(currency.minBet);
        }
    }, [currency]);

    return (
        <Stack
            className="game-container game-coinflip"
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
                    <ToggleButtonGroup size="small" color="primary" fullWidth exclusive value={color} onChange={handleChange}>
                        {colors.map((item, key) => (
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
                {isLoggedIn ? (
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }} disabled={loading || !color} onClick={onPlay}>
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
                <Box className="game-content game-content-coinflip">
                    <Box className="coin front" data-coin>
                        <Box className="front" />
                        <Box className="back" />
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default CoinFlip;
