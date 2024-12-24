import { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Card, CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { FormattedMessage } from 'react-intl';

import useConfig from 'hooks/useConfig';
import config, { BASE_URL } from 'config';
import { inintSportsData, SportsListProps, SportsMatchProps, SportsParamsProps } from 'types/sports';

import Axios from 'utils/axios';
import { checkUpdate, eventsNotAvailable } from 'utils/sports';

import Loader from 'ui-component/Loader';
import { SportsItem, Breadcrumbs } from 'ui-component';
import Transitions from 'ui-component/extended/Transitions';
import Event from './component/Event';
import Trophy from 'assets/images/sports/trophy.png';
import { useSelector } from 'store';

const InplayPage = () => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const params: SportsParamsProps = useParams();
    const navigate = useNavigate();
    const { search } = useSelector((store) => store.sports);
    const [activeSports, setActiveSports] = useState<number>(Number(params?.sportsId) || 0);
    const [activeSportsData, setActiveSportsData] = useState<SportsListProps>(inintSportsData);
    const [sportsLists, setSportsLists] = useState<SportsListProps[]>([]);
    const [sportsMatchs, setSportsMatchs] = useState<SportsMatchProps[]>([]);
    const [activeLeague, setActiveLeague] = useState<number[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const updateMatchs = useCallback(checkUpdate, [sportsMatchs, activeSports]);

    const initActiveSport = (data: SportsListProps[]) => {
        if (!activeSports) {
            setActiveSports(data[0].SportId);
            setActiveSportsData(data[0]);
            navigate(`/inplay/${data[0].SportId}`, { replace: true });
        } else {
            setActiveSportsData(data.find((e) => e.SportId === activeSports) || inintSportsData);
        }
    };

    const activeSportsHandler = (SportId: number) => {
        setActiveSports(SportId);
        setActiveSportsData(sportsLists.find((e) => e.SportId === SportId) || inintSportsData);
        setSportsMatchs([]);
        navigate(`/inplay/${SportId}`, { replace: true });
    };

    const activeLeagueHandler = (LeagueId: number) => {
        const isOpen = activeLeague.indexOf(LeagueId) > -1;
        if (isOpen) {
            setActiveLeague(activeLeague.filter((id: number) => id !== LeagueId));
        } else {
            setActiveLeague([...activeLeague, LeagueId]);
        }
    };

    const getSportsLists = () => {
        setPageLoading(true);
        Axios.post('api/v1/sports/lists', {
            EventStatus: 'LIVE'
        })
            .then(({ data }) => {
                setSportsLists(data);
                initActiveSport(data);
                setPageLoading(false);
            })
            .catch(() => {
                setPageLoading(false);
            });
    };

    const getSportMatchs = () => {
        if (!activeSports) return;
        setLoading(true);
        Axios.post('api/v1/sports/matchs', {
            SportId: activeSports,
            EventStatus: 'LIVE'
        })
            .then(({ data }) => {
                updateMatchs(data, sportsMatchs, activeSports, setSportsMatchs);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getSportsListsTimer = () => {
        Axios.post('api/v1/sports/lists', {
            EventStatus: 'LIVE'
        }).then(({ data }) => {
            setSportsLists(data);
        });
    };

    const getSportMatchsTimer = useCallback(() => {
        if (!activeSports) return;
        Axios.post('api/v1/sports/matchs', {
            SportId: activeSports,
            EventStatus: 'LIVE'
        }).then(({ data }) => {
            updateMatchs(data, sportsMatchs, activeSports, setSportsMatchs);
        });
    }, [activeSports, sportsMatchs, updateMatchs]);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            getSportsLists();
        }
        return () => {
            unmounted = true;
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            getSportMatchs();
        }
        return () => {
            unmounted = true;
        };
        // eslint-disable-next-line
    }, [activeSports]);

    useEffect(() => {
        let unmounted = false;
        const timer = setInterval(() => {
            if (!unmounted) {
                getSportMatchsTimer();
                getSportsListsTimer();
            }
        }, config.timer1);
        return () => {
            clearInterval(timer);
            unmounted = true;
        };
    }, [getSportMatchsTimer]);

    const renderMatchs = () => {
        if (loading) {
            return (
                <Stack alignItems="center" justifyContent="center">
                    <CircularProgress color="inherit" />
                </Stack>
            );
        }
        if (!sportsMatchs.length) {
            return eventsNotAvailable();
        }
        return sportsMatchs.map((item, key) => {
            const events = item.events.filter(
                (e) =>
                    e.home.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    e.away.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (!events.length) return <Fragment key={key} />;
            return (
                <Card
                    key={key}
                    sx={{
                        background: config.dark3,
                        borderRadius: '8px',
                        py: 2,
                        px: { xs: 1, sm: 2 },
                        boxShadow
                    }}
                >
                    <Stack
                        onClick={() => activeLeagueHandler(item.LeagueId)}
                        pl={1}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ overflow: 'hidden', borderRadius: 1, cursor: 'pointer' }}
                    >
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '16px',
                                lineHeight: '100%',
                                color: '#fff'
                            }}
                        >
                            {item.LeagueName}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Badge
                                badgeContent={item.events?.length || 0}
                                color="secondary"
                                sx={{
                                    mr: 3,
                                    '& .MuiBadge-badge': {
                                        background: 'linear-gradient(228.67deg, #7CD044 5.65%, #6AB739 100%), #D9D9D9'
                                    }
                                }}
                            />
                            <IconButton size="small">
                                {activeLeague.indexOf(item.LeagueId) !== -1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
                            </IconButton>
                        </Stack>
                    </Stack>
                    {activeLeague.indexOf(item.LeagueId) !== -1 && (
                        <Transitions in direction="up" type="slide">
                            {events.map((event, index) => (
                                <Event key={index} event={event} activeSports={activeSportsData} isLive />
                            ))}
                        </Transitions>
                    )}
                </Card>
            );
        });
    };

    if (pageLoading) return <Loader />;
    if (!sportsLists.length) return eventsNotAvailable();

    return (
        <Transitions in direction="up" type="slide">
            <Box className="sports-items">
                <PerfectScrollbar aria-setsize={2}>
                    <Stack direction="row" spacing={2} sx={{ mt: 2, gap: '5%' }}>
                        {sportsLists.map((item, key) => (
                            <Badge key={key} badgeContent={item.count} color="primary" max={10000}>
                                <SportsItem
                                    index={key % 5}
                                    theme={theme}
                                    active={activeSports === item.SportId}
                                    bgcolor={item.color}
                                    onClick={() => activeSportsHandler(item.SportId)}
                                >
                                    <Box className="warraper">
                                        <Box className="cover">
                                            <Box className="back" />
                                            <i className={`sportsicons sportsicon-${item.SportId}`} />
                                        </Box>
                                    </Box>
                                    <Typography>{item.SportName && <FormattedMessage id={item.SportName} />}</Typography>
                                </SportsItem>
                            </Badge>
                        ))}
                    </Stack>
                </PerfectScrollbar>
                <Breadcrumbs theme={theme} background={`${BASE_URL}/${activeSportsData?.img}`}>
                    <Stack className="text-box">
                        <Typography variant="h3">
                            {activeSportsData?.SportName && <FormattedMessage id={activeSportsData.SportName} />}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">
                                <FormattedMessage id="Home" />
                            </Typography>
                            <Typography variant="body1">/</Typography>
                            <Typography variant="body2">
                                {activeSportsData?.SportName && <FormattedMessage id={activeSportsData.SportName} />}
                            </Typography>
                        </Stack>
                    </Stack>
                    <img className="background" src={`${BASE_URL}/${activeSportsData?.img}`} alt="" />
                    <img className="trophy" src={Trophy} alt="" />
                    <Box className="light-1" />
                    <Box className="light-2" />
                    <Box className="light-3" />
                    <Box className="light-4" />
                    <Box className="light-5" />
                </Breadcrumbs>
            </Box>
            <Card
                sx={{
                    mt: 2,
                    p: { xs: 1, sm: 3 },
                    borderRadius: '8px',
                    background: '#181D2D',
                    boxShadow
                }}
            >
                <Stack spacing={{ xs: 1, sm: 2 }}>{renderMatchs()}</Stack>
            </Card>
        </Transitions>
    );
};

export default InplayPage;
