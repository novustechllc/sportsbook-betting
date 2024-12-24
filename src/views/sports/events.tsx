import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Avatar, Box, Breadcrumbs, Card, Divider, IconButton, Link, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import useConfig from 'hooks/useConfig';
import config, { BASE_URL } from 'config';
import { initEvents, MarketProps, OddTypes, SportsEventProps, SportsListProps } from 'types/sports';

import Axios from 'utils/axios';
import {
    addRemoveBetslip,
    checkActive,
    convertBetslipData,
    convertHandicap,
    eventsNotAvailable,
    formatData,
    getIsLock
} from 'utils/sports';

import { useDispatch, useSelector } from 'store';
import { setBetslip } from 'store/reducers/sports';

import { SportsLockIcon } from 'ui-component/SvgIcon';
import Transitions from 'ui-component/extended/Transitions';
import { EventBreadcrumbs, OddWarraper } from 'ui-component';
import OddNum from './component/OddNum';

const EventsPage = () => {
    const theme = useTheme();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { boxShadow } = useConfig();
    const [loading, setLoading] = useState<boolean>(false);
    const [activeSports, setActiveSports] = useState<SportsListProps>();
    const [markets, setMarkets] = useState<MarketProps[]>([]);
    const [events, setEvents] = useState<SportsEventProps>(initEvents);
    const [activeOdds, setActiveOdds] = useState([]);

    const onInit = () => {
        setEvents(initEvents);
        setActiveSports({} as any);
        setMarkets([]);
    };

    const backHandler = () => {
        let name = 'sports';
        const prevPath = location.state as any;
        if (prevPath?.prevPath !== undefined) {
            name = prevPath.prevPath.split('/')[1];
        }
        navigate(`/${name}/${activeSports?.SportId}`);
    };

    const getSportOddsTimer = useCallback(() => {
        if (!params.id) return;
        Axios.post('api/v1/sports/odds', { id: params.id }).then(({ data }) => {
            if (!data.state) {
                onInit();
            } else {
                setEvents(data.event);
                setActiveSports(data.activeSports);
                const market = formatData(data.event);
                setMarkets(market);
            }
        });
    }, [params]);

    useEffect(() => {
        if (!params.id) return;
        setLoading(true);
        Axios.post('api/v1/sports/odds', { id: params.id })
            .then(({ data }) => {
                if (!data.state) {
                    onInit();
                } else {
                    setEvents(data.event);
                    setActiveSports(data.activeSports);
                    const market = formatData(data.event);
                    setMarkets(market);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [params]);

    useEffect(() => {
        const timer = setInterval(() => {
            getSportOddsTimer();
        }, config.timer1);
        return () => {
            clearInterval(timer);
        };
    }, [getSportOddsTimer]);
    if (loading) return <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '8px', boxShadow }} />;
    if (!markets.length) return eventsNotAvailable();
    return (
        <Transitions in direction="up" type="slide">
            <EventBreadcrumbs theme={theme}>
                <Stack className="text-wrapper">
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                        <Box gridColumn="span 3">
                            <Stack spacing={1} alignItems="center">
                                <Avatar
                                    src={`${BASE_URL}/${events.home?.image_id}.png`}
                                    alt={events.home?.name}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: 0,
                                        background: 'transparent',
                                        fontSize: '4rem',
                                        color: '#fff'
                                    }}
                                />
                                <Typography className="team-name">{events.home?.name}</Typography>
                            </Stack>
                        </Box>
                        <Box
                            gridColumn="span 6"
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Stack spacing={1}>
                                <Typography className="h6" textAlign="center" color="peru">
                                    Start Time
                                </Typography>
                                <Typography color="#fff" variant="h2" textAlign="center" fontSize="2rem">
                                    {moment(events.time * 1000).format('hh:mm')}
                                </Typography>
                                <Typography color="#fff" variant="h2" textAlign="center">
                                    {moment(events.time * 1000).format('DD.MM.YYYY')}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box gridColumn="span 3">
                            <Stack spacing={1} alignItems="center">
                                <Avatar
                                    src={`${BASE_URL}/${events.away?.image_id}.png`}
                                    alt={events.away?.name}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: 0,
                                        background: 'transparent',
                                        fontSize: '4rem',
                                        color: '#fff'
                                    }}
                                />
                                <Typography className="team-name">{events.away?.name}</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
                <img className="background" src={`${BASE_URL}/${activeSports?.img}`} alt="" />
                <Box className="light-1" />
                <Box className="light-2" />
                <Box className="light-3" />
            </EventBreadcrumbs>
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                    background: config.dark3,
                    borderRadius: 1,
                    mb: 1,
                    p: 2,
                    boxShadow
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Link
                        color="inherit"
                        underline="hover"
                        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                        onClick={() => navigate(-1)}
                    >
                        <KeyboardArrowLeftIcon />
                    </Link>
                    <Link
                        color="inherit"
                        underline="hover"
                        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                        onClick={backHandler}
                    >
                        {activeSports?.SportName && <FormattedMessage id={activeSports.SportName} />}
                    </Link>
                </Stack>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                    {`${events.home?.name} - ${events.away?.name}`}
                </Typography>
            </Breadcrumbs>
            {activeSports &&
                markets.map((item, key) => (
                    <SportsEvent
                        key={key}
                        market={item}
                        event={events}
                        sports={activeSports}
                        activeOdds={activeOdds}
                        setActiveOdds={setActiveOdds}
                    />
                ))}
        </Transitions>
    );
};

interface SportsEventsProps {
    market: MarketProps;
    event: SportsEventProps;
    sports: SportsListProps;
    activeOdds: string[];
    setActiveOdds: Function;
}

const SportsEvent = ({ market, event, sports, activeOdds, setActiveOdds }: SportsEventsProps) => {
    const isLive = event.time_status === 1;
    const dispatch = useDispatch();
    const { boxShadow } = useConfig();
    const { betslipData } = useSelector((state) => state.sports);
    const isOpen = !(activeOdds.indexOf(market.id) > -1);

    const onBet = (odd: any, oddType: OddTypes) => {
        const betslip = convertBetslipData({ event, odd, oddType, sports });
        dispatch(setBetslip(addRemoveBetslip(betslipData, betslip)));
    };

    const onActive = () => {
        const findIndex = activeOdds.indexOf(market.id);
        if (findIndex === -1) {
            setActiveOdds([...activeOdds, market.id]);
        } else {
            const data = [...activeOdds];
            data.splice(findIndex, 1);
            setActiveOdds([...data]);
        }
    };

    const renderEvent = () => {
        let item = market.data as any;
        const aa = item.home_od ? item.home_od : item.over_od;
        const bb = item.handicap ? item.handicap : item.draw_od;
        const cc = item.away_od ? item.away_od : item.under_od;
        const home = market.home;
        const away = market.away;
        item = { marketId: market.id, marketName: market.name, ...item };
        if (aa === '-' || getIsLock({ item, sports, event, isLive })) {
            return (
                <>
                    <OddWarraper gridColumn="span 6" update={undefined}>
                        <Stack alignItems="center" width="100%">
                            <SportsLockIcon />
                        </Stack>
                    </OddWarraper>
                    <OddWarraper gridColumn="span 6" update={undefined}>
                        <Stack alignItems="center" width="100%">
                            <SportsLockIcon />
                        </Stack>
                    </OddWarraper>
                </>
            );
        }
        if (
            market.id.indexOf('_1') !== -1 ||
            market.id === '1_8' ||
            market.id === '18_4' ||
            market.id === '18_7' ||
            market.id === '3_4' ||
            market.id === '13_4'
        ) {
            if (bb) {
                return (
                    <>
                        <OddWarraper
                            gridColumn="span 4"
                            update={item?.update1}
                            onClick={() => onBet(item, OddTypes.Home)}
                            active={checkActive(betslipData, item.id, OddTypes.Home)}
                        >
                            <Typography className="odd-attr">{home}</Typography>
                            <OddNum odd={aa} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 4"
                            update={item?.update3}
                            onClick={() => onBet(item, OddTypes.Draw)}
                            active={checkActive(betslipData, item.id, OddTypes.Draw)}
                        >
                            <Typography className="odd-attr">Draw</Typography>
                            <OddNum odd={bb} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 4"
                            update={item?.update2}
                            onClick={() => onBet(item, OddTypes.Away)}
                            active={checkActive(betslipData, item.id, OddTypes.Away)}
                        >
                            <Typography className="odd-attr">{away}</Typography>
                            <OddNum odd={cc} />
                        </OddWarraper>
                    </>
                );
            }
            if (!bb) {
                return (
                    <>
                        <OddWarraper
                            gridColumn="span 6"
                            update={item?.update1}
                            onClick={() => onBet(item, OddTypes.Home)}
                            active={checkActive(betslipData, item.id, OddTypes.Home)}
                        >
                            <Typography className="odd-attr">{home}</Typography>
                            <OddNum odd={aa} />
                        </OddWarraper>
                        <OddWarraper
                            gridColumn="span 6"
                            update={item?.update2}
                            onClick={() => onBet(item, OddTypes.Away)}
                            active={checkActive(betslipData, item.id, OddTypes.Away)}
                        >
                            <Typography className="odd-attr">{away}</Typography>
                            <OddNum odd={cc} />
                        </OddWarraper>
                    </>
                );
            }
        } else if (market.id.indexOf('_2') !== -1 || market.id === '1_5' || market.id === '18_5' || market.id === '18_8') {
            return (
                <>
                    <OddWarraper
                        gridColumn="span 6"
                        update={item?.update1}
                        onClick={() => onBet(item, OddTypes.Home)}
                        active={checkActive(betslipData, item.id, OddTypes.Home)}
                    >
                        <Typography className="odd-attr">
                            {home} ({convertHandicap(bb, true)})
                        </Typography>
                        <OddNum odd={aa} />
                    </OddWarraper>
                    <OddWarraper
                        gridColumn="span 6"
                        update={item?.update2}
                        onClick={() => onBet(item, OddTypes.Away)}
                        active={checkActive(betslipData, item.id, OddTypes.Away)}
                    >
                        <Typography className="odd-attr">
                            {away} ({convertHandicap(bb, false)})
                        </Typography>
                        <OddNum odd={cc} />
                    </OddWarraper>
                </>
            );
        } else if (
            market.id.indexOf('_3') !== -1 ||
            market.id === '1_4' ||
            market.id === '1_6' ||
            market.id === '1_7' ||
            market.id === '18_6' ||
            market.id === '18_9'
        ) {
            return (
                <>
                    <OddWarraper
                        gridColumn="span 6"
                        update={item?.update1}
                        onClick={() => onBet(item, OddTypes.Over)}
                        active={checkActive(betslipData, item.id, OddTypes.Over)}
                    >
                        <Typography className="odd-attr">Over {bb}</Typography>
                        <OddNum odd={aa} />
                    </OddWarraper>
                    <OddWarraper
                        gridColumn="span 6"
                        update={item?.update2}
                        onClick={() => onBet(item, OddTypes.Under)}
                        active={checkActive(betslipData, item.id, OddTypes.Under)}
                    >
                        <Typography className="odd-attr">Under {bb}</Typography>
                        <OddNum odd={cc} />
                    </OddWarraper>
                </>
            );
        }
        return <span />;
    };

    return (
        <Card
            sx={{
                background: config.dark3,
                borderRadius: 1,
                mb: 1,
                boxShadow
            }}
        >
            <Stack
                px={2}
                py={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={onActive}
            >
                <Typography
                    sx={{
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '100%',
                        color: '#fff'
                    }}
                >
                    {market.name && <FormattedMessage id={market.name} />}
                </Typography>
                <IconButton onClick={onActive} size="small">
                    {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
                </IconButton>
            </Stack>
            {isOpen && (
                <>
                    <Divider />
                    <Transitions in direction="up" type="slide" p={2}>
                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
                            {renderEvent()}
                        </Box>
                    </Transitions>
                </>
            )}
        </Card>
    );
};

export default EventsPage;
