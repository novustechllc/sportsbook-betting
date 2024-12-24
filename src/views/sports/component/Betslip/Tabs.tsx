import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Tab,
    Tabs,
    Typography,
    FormGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Checkbox,
    useTheme
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';

import CopyToClipboard from 'react-copy-to-clipboard';
import { FormattedMessage, useIntl } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { TwitterShareButton, FacebookShareButton, TelegramShareButton, FacebookIcon, TelegramIcon, TwitterIcon } from 'react-share';
import { setRecentBets } from 'store/reducers/sports';

import config, { BASE_URL } from 'config';
import { BetslipProps, SelectOddProps } from 'types/sports';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';
import { abbreviate, addRemoveBetslip, convertHandicap, getTeaserData } from 'utils/sports';

import { useDispatch, useSelector } from 'store';
// import { ChangePage } from 'store/reducers/menu';
import { clearAll, setBetslip } from 'store/reducers/sports';

import Transitions from 'ui-component/extended/Transitions';
import { MultiIcon, SingleIcon } from 'ui-component/SvgIcon';
import AnimateButton from 'ui-component/extended/AnimateButton';
import OddNum from 'views/sports/component/OddNum';

import Axios from 'utils/axios';

const BetTabs = () => {
    const allTeaserTypes = {
        AmericanFootball: [6, 6.5, 7],
        Basketball: [4, 4.5, 5]
    };

    const teaserData: any = getTeaserData();

    const Api = useApi();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { boxShadow } = useConfig();
    const { betslipData } = useSelector((state) => state.sports);
    const { user, currency, isLoggedIn, balance } = useSelector((state) => state.auth);
    const [teaserTypes, setTeaserTypes] = useState<any>(allTeaserTypes.AmericanFootball);
    const [teaserFg, setTeaserFg] = useState<boolean>(false);
    const [result, setResult] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [betsId, setBetsId] = useState<string>('');
    const [aError, setAError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isbet, setIsbet] = useState<boolean>(false);

    const [teaser, setTeaser] = useState<boolean>(false);
    const [teaserOption, setTeaserOption] = useState('');

    const getOddName = (HomeTeam: string, AwayTeam: string, odd: any, oddType: any, teaserPoint: string) => {
        let tPoint = Number(teaserPoint);
        let oddName = '';
        const marketId = odd.marketId;
        if (marketId.indexOf('_1') !== -1 || marketId === '1_8' || marketId === '18_4' || marketId === '18_7' || marketId === '3_4') {
            if (oddType === 'home') {
                oddName = HomeTeam;
            } else if (oddType === 'away') {
                oddName = AwayTeam;
            } else if (oddType === 'draw') {
                oddName = 'Draw';
            }
        } else if (marketId.indexOf('_2') !== -1 || marketId === '1_5' || marketId === '18_5' || marketId === '18_8') {
            if (oddType === 'home') {
                const pt = Number(convertHandicap(odd.handicap, true)) + tPoint;
                oddName = `${HomeTeam} (${pt > 0 ? `${pt}` : pt})`;
            } else if (oddType === 'away') {
                const pt = Number(convertHandicap(odd.handicap, false)) + tPoint;
                oddName = `${AwayTeam} (${pt > 0 ? `${pt}` : pt})`;
            }
        } else if (
            marketId.indexOf('_3') !== -1 ||
            marketId === '1_4' ||
            marketId === '1_6' ||
            marketId === '1_7' ||
            marketId === '18_6' ||
            marketId === '18_9'
        ) {
            if (oddType === 'over' || oddType === 'under') {
                const pt = Number(convertHandicap(odd.handicap, true)) - tPoint;
                oddName = `${oddType} (${pt > 0 ? `${pt}` : pt})`;
            } else {
                const pt = Number(convertHandicap(odd.handicap, true)) + tPoint;
                oddName = `${oddType} (${pt > 0 ? `${pt}` : pt})`;
            }
        }
        return oddName;
    };

    const handleTeaserOptionChange = (event: SelectChangeEvent) => {
        setTeaserOption(event.target.value as string);
    };

    const tabChangeHandler = (event: React.SyntheticEvent, index: number) => {
        setActiveTab(index);
        clearHandler();
    };

    const clearAllHandler = () => {
        dispatch(clearAll());
        clearHandler();
    };

    const clearHandler = () => {
        setAError('');
        setError('');
        setResult([]);
        setIsbet(false);
    };

    const clearItemHandler = (betslip: BetslipProps) => {
        dispatch(setBetslip(addRemoveBetslip(betslipData, betslip)));
    };

    const singleAmountHandler = (params: BetslipProps, value: any) => {
        const betslipdata = [...betslipData];
        for (const i in betslipdata) {
            if (betslipdata[i].oddId === params.oddId && betslipdata[i].oddType === params.oddType) {
                const data = { ...betslipdata[i], stake: value };
                betslipdata[i] = data;
            }
        }
        dispatch(setBetslip([...betslipdata]));
    };

    const multiAmountHandler = (value: any) => {
        setAmount(value);
    };

    const totalOdds = betslipData.reduce((sum, { odds }) => {
        sum += Number(odds);
        return sum;
    }, 0);

    const multiplyOdds = betslipData.reduce((sum, { odds }) => {
        sum *= Number(odds);
        return sum;
    }, 1);

    const totalStake = betslipData.reduce((sum, { stake }) => {
        sum += Number(stake);
        return sum;
    }, 0);

    const totalPayout = betslipData.reduce((sum, { stake, odds }) => {
        sum += Number(stake) * Number(odds);
        return sum;
    }, 0);

    const multiplyMany = betslipData.reduce((sum, { stake, odds }) => {
        sum *= Number(odds);
        return sum;
    }, amount);

    const maxBet = currency?.maxBet || 0;
    const minBet = currency?.minBet || 0;
    const betLimit = currency?.betLimit || 0;
    const odds = activeTab === 0 ? totalOdds : multiplyOdds;
    const stake = activeTab === 0 ? totalStake : amount;
    const isBet = balance > 0 && balance >= stake;
    let potential = activeTab === 0 ? totalPayout : multiplyMany;

    const betHandler = () => {
        setError('');
        setAError('');
        if (!betslipData.length) return;

        let betslipinfo: any[] = [];
        let newBetSlipData: any = [];
        if (teaserSetted()) {
            // Teaser Bet
            for (let i = 0; i < betslipData.length; i++) {
                let np: Number;
                np = Number(betslipData[i].oddData.handicap) + Number(teaserOption);
                if (betslipData[i].oddType === 'over' || betslipData[i].oddType === 'under') {
                    np = Number(betslipData[i].oddData.handicap) - Number(teaserOption);
                }
                newBetSlipData.push({
                    ...betslipData[i],
                    oddData: {
                        ...betslipData[i].oddData,
                        handicap: np > 0 ? `${np}` : `-${np}`
                    },
                    oddName: getOddName(
                        betslipData[i].HomeTeam,
                        betslipData[i].AwayTeam,
                        betslipData[i].oddData,
                        betslipData[i].oddType,
                        teaserOption
                    )
                });
            }
            betslipinfo = newBetSlipData;
            const teaserPointPayout = teaserPayoutCalc(Number(teaserOption));
            potential = amount * teaserPointPayout;
        } else {
            betslipinfo = betslipData;
        }

        let betData = [] as any;
        const userId = user._id;
        const currencyId = currency?._id;
        const symbol = currency?.symbol;
        const type = activeTab === 0 ? 'single' : teaserSetted() ? 'teaser' : 'multi';
        if (activeTab === 0) {
            for (const i in betslipinfo) {
                if (betslipinfo[i].stake <= maxBet && betslipinfo[i].stake >= minBet) {
                    const perPotential = Number(betslipinfo[i].odds) * Number(betslipinfo[i].stake);
                    if (perPotential > betLimit) {
                        setAError(
                            `Your bet exceeds the maximum in ${betslipinfo[i].oddName} odd. Maximum ${symbol} Bet Limit is ${abbreviate(
                                betLimit
                            )} ${symbol}.`
                        );
                        return;
                    }
                    betData.push({
                        bets: [betslipinfo[i]],
                        odds: betslipinfo[i].odds,
                        stake: betslipinfo[i].stake,
                        potential: perPotential,
                        userId,
                        currency: currencyId,
                        betType: betslipinfo[i].SportId,
                        type
                    });
                } else {
                    setAError(`Maximum bet ${abbreviate(maxBet)} ${symbol} minimum bet ${abbreviate(minBet)} ${symbol}.`);
                    return;
                }
            }
        } else if (stake <= maxBet && stake >= minBet) {
            // eslint-disable-next-line
            const betslip = betslipinfo
                .map((item: any) => item.eventId)
                .reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));
            // if (potential > betLimit) {
            //     setAError(`Your bet exceeds the maximum. Maximum ${symbol} Bet Limit is ${abbreviate(betLimit)} ${symbol}.`);
            //     return;
            // }
            const betslipDt = Object.values(betslip) as any;
            if (betslipDt.find((e: number) => e > 1)) {
                setError(formatMessage({ id: 'Multiple selections from some event cannot be combined into a Multibet.' }));
                return;
            }
            let oddNum: number;
            if (teaserSetted()) {
                const teaserPointPayout = teaserPayoutCalc(Number(teaserOption));
                oddNum = teaserPointPayout;
            } else {
                oddNum = odds;
            }
            betData = {
                bets: betslipinfo,
                odds: oddNum,
                stake,
                potential,
                currency: currencyId,
                userId,
                betType: 0,
                type
            };
        } else {
            setAError(`Maximum bet ${abbreviate(maxBet)} ${symbol} minimum bet ${abbreviate(minBet)} ${symbol}.`);
            return;
        }
        if (error || aError) return;
        setLoading(true);
        Api.betSport(betData, type, stake)
            .then(({ data }) => {
                clearAllHandler();
                if (data.data.type === 'multi' || data.data.type === 'teaser') {
                    setResult([data.data.data]);
                } else {
                    setResult(data.data.data);
                }
                setBetsId(data.betsId);
                setAmount(0);
                setIsbet(true);
                setLoading(false);
                snackbar(formatMessage({ id: 'Submit successfully!' }));
                Axios.post('api/v2/sports/recents-history').then(({ data }) => {
                    dispatch(setRecentBets(data));
                });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const checkTeaserBet = () => {
        if (betslipData.length >= 2 && betslipData.length <= 7) {
            let iNum = 0;
            let perSportsNum: { AmericanFootball: number; Basketball: number } = { AmericanFootball: 0, Basketball: 0 };
            for (let i = 0; i < betslipData.length; i++) {
                // American Football 12
                // Basketball 18
                if (betslipData[i].SportId === 12) {
                    perSportsNum.AmericanFootball++;
                } else if (betslipData[i].SportId === 18) {
                    perSportsNum.Basketball++;
                }
                if (
                    (betslipData[i].SportId === 12 || betslipData[i].SportId === 18) &&
                    (betslipData[i].marketId.indexOf('_2') !== -1 || betslipData[i].marketId.indexOf('_3') !== -1)
                ) {
                    iNum++;
                }
            }
            if (perSportsNum.AmericanFootball === 0) {
                setTeaserTypes(allTeaserTypes.Basketball);
                return betslipData.length === iNum;
            } else if (perSportsNum.Basketball === 0) {
                setTeaserTypes(allTeaserTypes.AmericanFootball);
                return betslipData.length === iNum;
            } else {
                return false;
            }
        }
        return false;
    };

    const teaserPayoutCalc = (type: number) => {
        const teasers = teaserData[teaserData.findIndex((item: any) => item.point === type)].teaser;
        let teaserPointPayout = 0;
        if (betslipData.length > 1) {
            teaserPointPayout = teasers[teasers.findIndex((item: any) => item.team === betslipData.length)].calc;
        }
        return teaserPointPayout;
    };

    const oddCalcFunc = (tOdds: string) => {
        if (teaserSetted() && teaserOption) {
            const teaserPointPayout = teaserPayoutCalc(Number(teaserOption));
            return teaserPointPayout;
        }
        return tOdds;
    };

    const teaserSetted = (): boolean => {
        return Boolean(teaser === true && teaserFg === true && teaserOption && betslipData.length >= 2 && betslipData.length <= 7);
    };

    const renderValue = (value: string) => {
        // return `${value} - Point Teaser`;
        const teasers = teaserData[teaserData.findIndex((item: any) => item.point === value)].teaser;
        let teaserPointPayout = 0;
        if (teaserSetted()) {
            teaserPointPayout = teasers[teasers.findIndex((item: any) => item.team === betslipData.length)].payout;
        }
        return (
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack>{value}&nbsp;-&nbsp;Point Teaser</Stack>
                <Stack>{teaserPointPayout > 0 ? `${teaserPointPayout}` : teaserPointPayout}</Stack>
            </Stack>
        );
    };

    useEffect(() => {
        setTeaserFg(checkTeaserBet());
    }, [betslipData]);

    useEffect(() => {
        if (teaserTypes.indexOf(teaserOption) === -1) {
            setTeaserOption(teaserTypes[0]);
        }
    }, [teaserTypes]);

    return (
        <>
            <Tabs
                value={activeTab}
                onChange={tabChangeHandler}
                aria-label="icon"
                sx={{
                    mx: 2,
                    mt: 1,
                    minHeight: '45px',
                    '& .MuiTabs-indicator': {
                        background: '#fff'
                    }
                }}
            >
                <Tab
                    icon={<SingleIcon />}
                    label={formatMessage({ id: 'Single' })}
                    iconPosition="start"
                    sx={{
                        minHeight: '45px',
                        opacity: '0.5',
                        color: '#fff',
                        fontWeight: '600',
                        '& svg': {
                            width: '14px',
                            mt: -0.2,
                            mr: 0.5
                        },
                        '&.Mui-selected': {
                            color: '#fff',
                            opacity: '1'
                        }
                    }}
                />
                <Tab
                    icon={<MultiIcon />}
                    label={formatMessage({ id: 'Multi' })}
                    iconPosition="start"
                    sx={{
                        minHeight: '45px',
                        opacity: '0.5',
                        color: '#fff',
                        fontWeight: '600',
                        '& svg': {
                            width: '14px',
                            mt: -0.2,
                            mr: 0.5
                        },
                        '&.Mui-selected': {
                            color: '#fff',
                            opacity: '1'
                        }
                    }}
                />
            </Tabs>
            <Divider />
            <Stack my={1} px={1.5} direction="row" justifyContent="flex-end">
                <Button onClick={clearAllHandler} size="small" sx={{ color: 'white' }}>
                    <FormattedMessage id="Clear all" />
                </Button>
            </Stack>
            {isbet ? (
                <>
                    <PerfectScrollbar
                        component="div"
                        style={{
                            // background: '#191d2e',
                            padding: '0 14px'
                        }}
                    >
                        {(result as any[]).map((item: any) =>
                            ((item && item.bets) as any[]).map((bet: any, key) => (
                                <Transitions key={key} in direction="left" type="slide">
                                    <Card
                                        sx={{
                                            mb: 1,
                                            boxShadow
                                        }}
                                        style={{ borderRadius: '4px' }}
                                    >
                                        <CardHeader
                                            sx={{
                                                background: bet.finished === true || bet.updated === true ? '#4d000d' : '#3F4357',
                                                p: 1.5,
                                                '& .MuiCardHeader-title': {
                                                    fontSize: '14px'
                                                },
                                                '& svg': {
                                                    fontSize: '16px'
                                                },
                                                boxShadow
                                            }}
                                            title={
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    {bet.finished === true || bet.updated === true ? (
                                                        <CloseIcon color="error" />
                                                    ) : (
                                                        <CheckIcon color="success" />
                                                    )}
                                                    <Typography
                                                        onClick={() => navigate(`/events/${bet.eventId}`)}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        {`${bet.HomeTeam} - ${bet.AwayTeam}`}
                                                    </Typography>
                                                </Stack>
                                            }
                                        />
                                        <CardContent sx={{ background: '#373636', p: 1.5 }} style={{ paddingBottom: '12px' }}>
                                            <Typography variant="body2">
                                                {bet.marketName && <FormattedMessage id={bet.marketName} />}
                                            </Typography>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2" color="white">
                                                    {bet.oddName}
                                                </Typography>
                                                <OddNum odd={bet.odds} color="white" />
                                            </Stack>
                                            {(bet.finished === true || bet.updated === true) && (
                                                <Typography color="error">
                                                    <FormattedMessage id="Bet rejected. Odds changed." />
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Transitions>
                            ))
                        )}
                    </PerfectScrollbar>
                    <Stack sx={{ background: config.dark1, p: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <FacebookShareButton url={`${BASE_URL}/bets/${betsId}`} quote="Follow or Fade boibook.io">
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={`${BASE_URL}/bets/${betsId}`} title="Follow or Fade boibook.io">
                                <TwitterIcon size={40} round />
                            </TwitterShareButton>
                            <TelegramShareButton url={`${BASE_URL}/bets/${betsId}`} title="Follow or Fade boibook.io">
                                <TelegramIcon size={40} round />
                            </TelegramShareButton>
                            <CopyToClipboard text={`${BASE_URL}/?b=${betsId}`} onCopy={() => snackbar(formatMessage({ id: 'Copied' }))}>
                                <IconButton>
                                    <ShareIcon sx={{ fontSize: '1.8rem' }} />
                                </IconButton>
                            </CopyToClipboard>
                        </Stack>
                        <AnimateButton>
                            <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={() => navigate('/my-bets')}>
                                <FormattedMessage id="View My Bets" />
                            </Button>
                        </AnimateButton>
                    </Stack>
                </>
            ) : (
                <>
                    <PerfectScrollbar
                        component="div"
                        style={{
                            // background: '#191d2e',
                            padding: '0 14px'
                        }}
                    >
                        {(activeTab === 1 && teaserFg === true && (
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={teaser}
                                            onChange={(e) => {
                                                setTeaser(Boolean(e.target.checked));
                                            }}
                                        />
                                    }
                                    label="Teaser Bet"
                                />
                                {teaser === true && teaserTypes.length > 0 && (
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="teaser-select-label">Teaser Options</InputLabel>
                                        <Select
                                            labelId="teaser-select-label"
                                            id="teaser-select-label"
                                            value={teaserOption}
                                            renderValue={() => renderValue(teaserOption)}
                                            label="Teaser"
                                            onChange={handleTeaserOptionChange}
                                        >
                                            {teaserTypes.map((type: any, index: number) => {
                                                const teasers = teaserData[teaserData.findIndex((item: any) => item.point === type)].teaser;
                                                let teaserPointPayout = 0;
                                                if (teaserSetted()) {
                                                    teaserPointPayout =
                                                        teasers[teasers.findIndex((item: any) => item.team === betslipData.length)].payout;
                                                }
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={type}
                                                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                                                    >
                                                        <Stack>{type}&nbsp;-&nbsp;Point Teaser</Stack>
                                                        <Stack>{teaserPointPayout > 0 ? `${teaserPointPayout}` : teaserPointPayout}</Stack>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            </FormGroup>
                        )) ||
                            (activeTab === 1 && betslipData.length > 0 && <Stack sx={{ my: 2 }}>Not available teaser.</Stack>)}
                        {betslipData.map((item, key) => (
                            <Transitions key={key} in direction="left" type="slide">
                                <Card
                                    sx={{
                                        mb: 1,
                                        boxShadow
                                    }}
                                    style={{ borderRadius: '4px' }}
                                >
                                    <CardHeader
                                        sx={{
                                            background: config.dark2,
                                            p: 1.5,
                                            '& .MuiCardHeader-title': {
                                                fontSize: '14px'
                                            },
                                            '& svg': {
                                                fontSize: '16px'
                                            },
                                            boxShadow
                                        }}
                                        action={
                                            <IconButton size="small" onClick={() => clearItemHandler(item)}>
                                                <CloseIcon />
                                            </IconButton>
                                        }
                                        title={
                                            <Typography onClick={() => navigate(`/events/${item.eventId}`)} sx={{ cursor: 'pointer' }}>
                                                {`${item.HomeTeam} - ${item.AwayTeam}`}
                                            </Typography>
                                        }
                                    />
                                    <CardContent sx={{ background: '#373636', p: 1.5 }} style={{ paddingBottom: '12px' }}>
                                        <Typography variant="body2">
                                            {item.marketName && <FormattedMessage id={item.marketName} />}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="white">
                                                {teaserSetted()
                                                    ? getOddName(item.HomeTeam, item.AwayTeam, item.oddData, item.oddType, teaserOption)
                                                    : item.oddName}
                                            </Typography>
                                            <OddNum odd={item.odds} color="white" />
                                        </Stack>
                                        {!activeTab && (
                                            <Stack direction="row" justifyContent="space-between">
                                                <OutlinedInput
                                                    id="betamount"
                                                    size="small"
                                                    type="number"
                                                    sx={{
                                                        width: 'calc(100% - 125px)',
                                                        borderRadius: 1,
                                                        '& fieldset': {
                                                            borderRadius: 1
                                                        }
                                                    }}
                                                    value={item.stake || ''}
                                                    onChange={(e) => singleAmountHandler(item, e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <img width="16px" src={currency?.icon} alt="icon" />
                                                        </InputAdornment>
                                                    }
                                                />
                                                <Stack alignItems="flex-end">
                                                    <Typography variant="subtitle2">
                                                        <FormattedMessage id="Est. Payout" />
                                                    </Typography>
                                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                                        <Typography className="text-ellipse" variant="subtitle2" sx={{ maxWidth: '100px' }}>
                                                            {toNumber(item.stake ? item.stake * item.odds : 0)}&nbsp;
                                                        </Typography>
                                                        <img width="16px" src={currency?.icon} alt="icon" />
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        )}
                                    </CardContent>
                                </Card>
                            </Transitions>
                        ))}
                    </PerfectScrollbar>
                    <Stack sx={{ background: config.dark1, p: 2 }}>
                        {activeTab ? (
                            <>
                                <OutlinedInput
                                    id="betamount"
                                    size="small"
                                    type="number"
                                    sx={{
                                        borderRadius: 1,
                                        '& fieldset': {
                                            borderRadius: 1
                                        }
                                    }}
                                    value={amount || ''}
                                    onChange={(e) => multiAmountHandler(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <img width="16px" src={currency?.icon} alt="icon" />
                                        </InputAdornment>
                                    }
                                />
                                <Stack direction="row" justifyContent="space-between" mt={1}>
                                    <Typography variant="body2" color="white">
                                        <FormattedMessage id="Total Odds" />
                                    </Typography>
                                    <Typography className="text-ellipse" variant="body2" color="primary" sx={{ maxWidth: '100px' }}>
                                        {oddCalcFunc(toNumber(multiplyOdds))}
                                    </Typography>
                                </Stack>
                            </>
                        ) : (
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="white">
                                    <FormattedMessage id="Total Stack" />
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Typography className="text-ellipse" variant="body2" color="#fff" sx={{ maxWidth: '100px' }}>
                                        {toNumber(totalStake)}
                                    </Typography>
                                    <img width="16px" src={currency?.icon} alt="icon" />
                                </Stack>
                            </Stack>
                        )}
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2" color="white">
                                <FormattedMessage id="Est. Payout" />
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Typography className="text-ellipse" variant="body2" color="#fff" sx={{ maxWidth: '100px' }}>
                                    {teaserSetted() ? toNumber(amount * teaserPayoutCalc(Number(teaserOption))) : toNumber(potential)}
                                </Typography>
                                <img width="16px" src={currency?.icon} alt="icon" />
                            </Stack>
                        </Stack>
                        {aError && (
                            <Alert
                                variant="outlined"
                                severity="error"
                                sx={{
                                    mt: 1,
                                    borderColor: theme.palette.error.main,
                                    '& .MuiAlert-message': {
                                        p: 0
                                    }
                                }}
                            >
                                {aError}
                            </Alert>
                        )}
                        {error && (
                            <Alert
                                variant="outlined"
                                severity="error"
                                sx={{
                                    mt: 1,
                                    borderColor: theme.palette.error.main,
                                    '& .MuiAlert-message': {
                                        p: 0
                                    }
                                }}
                            >
                                {error}
                            </Alert>
                        )}
                        <AnimateButton>
                            {isLoggedIn ? (
                                <>
                                    {isBet ? (
                                        <Button
                                            sx={{ mt: 1 }}
                                            variant="contained"
                                            fullWidth
                                            onClick={betHandler}
                                            disabled={!betslipData.length || loading || !stake || stake < minBet || stake > maxBet}
                                        >
                                            {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                            <FormattedMessage id="Bet" />
                                        </Button>
                                    ) : (
                                        <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={() => navigate('/user/wallet')}>
                                            <FormattedMessage id="Deposit" />
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <Button
                                    sx={{ mt: 1 }}
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                        snackbar(<>Please Sign in from Menu</>);
                                    }}
                                >
                                    <FormattedMessage id="Sign in" />
                                </Button>
                            )}
                        </AnimateButton>
                    </Stack>
                </>
            )}
        </>
    );
};

export default BetTabs;
