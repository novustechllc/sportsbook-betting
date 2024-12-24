import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import config from 'config';

import { MultibetIcon, StatusIcon } from 'ui-component/SvgIcon';
import useConfig from 'hooks/useConfig';
import { toNumber } from 'utils/number';
import Transitions from 'ui-component/extended/Transitions';
import OddNum from 'views/sports/component/OddNum';

export default function RecentBets() {
    const navigate = useNavigate();
    const { boxShadow } = useConfig();
    const [activeOdds, setActiveOdds] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const allRecentBets: any = useSelector((state: any) => state.sports.recentBets);
    const [recentBets, setRecentBets]: any = useState(allRecentBets.slice(0, 5));

    const onActive = (id: string) => {
        const findIndex = activeOdds.indexOf(id);
        if (findIndex === -1) {
            setActiveOdds([...activeOdds, id]);
        } else {
            const data = [...activeOdds];
            data.splice(findIndex, 1);
            setActiveOdds([...data]);
        }
    };

    const colorEffect = (num: any) => {
        const color = Number(num) >= 3 ? (Number(num) >= 10 ? '#70bf3d' : '#ffab00') : '#fff';
        return color;
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (allRecentBets.length > 0) {
            const currentRBets = allRecentBets.slice(page > 0 ? (page - 1) * 5 : 0, page > 0 ? page * 5 : 5);
            setRecentBets(currentRBets);
        }
    }, [page, allRecentBets]);

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
                Recent Bets
            </Typography>
            <Grid item>
                {recentBets?.map((rBet: any, key: number) => {
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
                                                {rBet.type === 'multi' || rBet.type === 'teaser' ? (
                                                    <MultibetIcon />
                                                ) : (
                                                    <i
                                                        className={`sportsicons sportsicon-${rBet.sport[0].SportId}`}
                                                        style={{ fontSize: '20px' }}
                                                    />
                                                )}
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <Typography variant="body2" color="primary">
                                                    Bet:&nbsp;
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className="text-ellipse"
                                                    color={colorEffect(toNumber(rBet.stake))}
                                                    sx={{ maxWidth: '100px' }}
                                                >
                                                    {toNumber(rBet.stake)}
                                                </Typography>
                                                <img width="16px" src={rBet.currency.icon} alt="icon" />
                                                <IconButton onClick={() => onActive(rBet?._id || '')} size="small">
                                                    {activeOdds.indexOf(rBet?._id || '') !== -1 ? (
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
                                    {activeOdds.indexOf(rBet?._id || '') !== -1 && (
                                        <Transitions in direction="left" type="slide">
                                            {(rBet.bettings as any[]).map((bettting, index) => (
                                                <Stack key={index}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <StatusIcon status={bettting.status} />
                                                        <Typography
                                                            onClick={() => navigate(`/events/${bettting.eventId}`)}
                                                            sx={{ pt: 0.5, cursor: 'pointer' }}
                                                        >
                                                            {`${bettting.HomeTeam} - ${bettting.AwayTeam}`}
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="body2">
                                                        {bettting.marketName && <FormattedMessage id={bettting.marketName} />}
                                                    </Typography>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="body2" color="white">
                                                            {bettting.oddName}
                                                        </Typography>
                                                        <OddNum odd={bettting.odds} color="primary" />
                                                    </Stack>
                                                    <Divider sx={{ my: 1 }} />
                                                </Stack>
                                            ))}
                                        </Transitions>
                                    )}
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">
                                            <FormattedMessage id="Total Odds" />
                                        </Typography>
                                        <Typography variant="body2" color="primary">
                                            {toNumber(rBet.odds)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">
                                            <FormattedMessage id="Total Stack" />
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                                {toNumber(rBet.stake)}
                                            </Typography>
                                            <img width="16px" src={rBet.currency.icon} alt="icon" />
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2">
                                            <FormattedMessage id="Payout" />
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                                {toNumber(rBet.potential)}
                                            </Typography>
                                            <img width="16px" src={rBet.currency.icon} alt="icon" />
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Transitions>
                    );
                })}
                <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
                    <Pagination count={5} onChange={handlePageChange} size={'small'} />
                </Stack>
            </Grid>
        </Card>
    );
}
