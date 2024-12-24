import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Typography, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import config, { BASE_URL } from 'config';

import { StatusIcon } from 'ui-component/SvgIcon';

import useConfig from 'hooks/useConfig';
import Transitions from 'ui-component/extended/Transitions';

import { TeamAvatar } from 'ui-component';

export default function LiveMatches() {
    const navigate = useNavigate();
    const { boxShadow } = useConfig();
    const allLiveMatches: any = useSelector((state: any) => state.sports.liveMatches);

    const [activeSports, setActiveSports] = useState<number[]>([]);
    const [activeLeague, setActiveLeague] = useState<number[]>([]);

    const onActive = (id: number) => {
        const findIndex = activeSports.indexOf(id);
        if (findIndex === -1) {
            setActiveSports([...activeSports, id]);
        } else {
            const data = [...activeSports];
            data.splice(findIndex, 1);
            setActiveSports([...data]);
        }
    };

    return (
        <Card
            sx={{
                p: 1,
                borderRadius: '8px',
                boxShadow
            }}
        >
            <Typography
                sx={{
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    marginBottom: '8px',
                    textAlign: 'center',
                    color: '#fff'
                }}
            >
                Live Matches
            </Typography>
            <Grid item>
                {allLiveMatches.length > 0 ? (
                    allLiveMatches?.map((sport: any, key: number) => {
                        return (
                            <Transitions key={key} in direction="left" type="slide">
                                <Card
                                    sx={{
                                        background: config.dark1,
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
                                        title={
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <i className={`sportsicons sportsicon-${sport.SportId}`} style={{ fontSize: '20px' }} />
                                                </Stack>
                                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                                    <Typography variant="body2" color="primary">
                                                        {sport.SportName}
                                                    </Typography>
                                                    <IconButton onClick={() => onActive(sport?.SportId || '')} size="small">
                                                        {activeSports.indexOf(sport?.SportId || '') !== -1 ? (
                                                            <KeyboardArrowDownIcon />
                                                        ) : (
                                                            <KeyboardArrowLeftIcon />
                                                        )}
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        }
                                    />
                                    <CardContent sx={{ p: 1.5 }} style={{ paddingBottom: '12px' }}>
                                        {activeSports.indexOf(sport?.SportId || '') !== -1 && (
                                            <Transitions in direction="left" type="slide">
                                                {(sport.leagues as any[]).map((league, index) => (
                                                    <Stack key={index}>
                                                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                                                            <Typography variant="body2">{league.LeagueName}</Typography>
                                                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                                                        </Stack>
                                                        {league.events.map((event: any, eventIndex: any) => {
                                                            var scores = event.scores;
                                                            if (scores) {
                                                                scores = scores[Object.keys(scores)[Object.keys(scores).length - 1]];
                                                            }
                                                            var cHomeScore = scores?.home || '';
                                                            var cAwayScore = scores?.away || '';
                                                            return (
                                                                <Stack
                                                                    key={eventIndex}
                                                                    sx={{ cursor: 'pointer' }}
                                                                    onClick={() => navigate(`/events/${event.id}`)}
                                                                >
                                                                    {eventIndex != 0 && <Divider sx={{ my: 1 }} />}
                                                                    <Stack
                                                                        direction="row"
                                                                        justifyContent="space-around"
                                                                        alignItems="center"
                                                                        spacing={1}
                                                                        m={1}
                                                                    >
                                                                        <Tooltip
                                                                            TransitionComponent={Zoom}
                                                                            title={event.home?.name}
                                                                            placement="top"
                                                                        >
                                                                            <TeamAvatar
                                                                                alt={event.home?.name}
                                                                                src={`${BASE_URL}/${event.home?.image_id}.png`}
                                                                            />
                                                                        </Tooltip>
                                                                        <Typography>vs</Typography>
                                                                        <Tooltip
                                                                            TransitionComponent={Zoom}
                                                                            title={event.away?.name}
                                                                            placement="top"
                                                                        >
                                                                            <TeamAvatar
                                                                                alt={event.away?.name}
                                                                                src={`${BASE_URL}/${event.away?.image_id}.png`}
                                                                            />
                                                                        </Tooltip>
                                                                    </Stack>
                                                                    <Stack
                                                                        direction="row"
                                                                        justifyContent="space-around"
                                                                        alignItems="center"
                                                                        spacing={1}
                                                                        m={1}
                                                                    >
                                                                        <Typography>{cHomeScore}</Typography>
                                                                        <Typography>-</Typography>
                                                                        <Typography>{cAwayScore}</Typography>
                                                                    </Stack>
                                                                </Stack>
                                                            );
                                                        })}
                                                    </Stack>
                                                ))}
                                            </Transitions>
                                        )}
                                    </CardContent>
                                </Card>
                            </Transitions>
                        );
                    })
                ) : (
                    <Typography variant="body2" textAlign="center">
                        There is no in-play events
                    </Typography>
                )}
            </Grid>
        </Card>
    );
}
