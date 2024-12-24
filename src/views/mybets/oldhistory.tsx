import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CopyToClipboard from 'react-copy-to-clipboard';
import { FormattedMessage, useIntl } from 'react-intl';

import moment from 'moment';

import { BASE_URL } from 'config';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import snackbar from 'utils/snackbar';
import { toNumber } from 'utils/number';

import { StatusBadge } from 'ui-component';
import { MultibetIcon, StatusIcon } from 'ui-component/SvgIcon';
import Transitions from 'ui-component/extended/Transitions';

import OddNum from 'views/sports/component/OddNum';

const MybetsHistory = () => {
    const { formatMessage } = useIntl();
    const { locale, boxShadow } = useConfig();
    moment.locale(locale);
    const Api = useApi();
    const navigate = useNavigate();
    const [activeOdds, setActiveOdds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [history, setHistory] = useState([]);

    const getMybets = () => {
        setLoading(true);
        Api.getMybets('Settled')
            .then(({ data }) => {
                setHistory(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

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

    useEffect(() => {
        getMybets();
        // eslint-disable-next-line
    }, []);

    if (loading) return <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '8px', boxShadow }} />;

    return (
        <Grid container spacing={1}>
            {history.map((item: any, key) => (
                <Grid key={key} item xs={12} sm={6} lg={4}>
                    <Transitions in direction="left" type="slide">
                        <Card
                            sx={{
                                mb: 1,
                                boxShadow
                            }}
                            style={{ borderRadius: '4px' }}
                        >
                            <CardHeader
                                sx={{
                                    background: '#3F4357',
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
                                            {item.type === 'multi' || item.type === 'teaser' ? (
                                                <MultibetIcon />
                                            ) : (
                                                <i
                                                    className={`sportsicons sportsicon-${item.sport[0].SportId}`}
                                                    style={{ fontSize: '20px' }}
                                                />
                                            )}
                                            <StatusBadge status={item.status} />
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {moment(item.createdAt).format('ddd, MMM YY, h:mm A')}
                                            <IconButton onClick={() => onActive(item?._id || '')} size="small">
                                                {activeOdds.indexOf(item?._id || '') !== -1 ? (
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
                                {activeOdds.indexOf(item?._id || '') !== -1 && (
                                    <Transitions in direction="left" type="slide">
                                        {(item.bettings as any[]).map((bettting, index) => (
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
                                        {toNumber(item.odds)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        <FormattedMessage id="Total Stack" />
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.stake)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        <FormattedMessage id="Payout" />
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.potential)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between">
                                    <CopyToClipboard text={item._id} onCopy={() => snackbar(formatMessage({ id: 'Copied' }))}>
                                        <IconButton
                                            sx={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '30px'
                                            }}
                                        >
                                            <Typography variant="body2" color="#fff" sx={{ textTransform: 'uppercase' }}>
                                                ID
                                            </Typography>
                                        </IconButton>
                                    </CopyToClipboard>
                                    <CopyToClipboard
                                        text={`${BASE_URL}/?b=${item.betsId}`}
                                        onCopy={() => snackbar(formatMessage({ id: 'Copied' }))}
                                    >
                                        <IconButton
                                            sx={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '30px'
                                            }}
                                        >
                                            <LinkIcon sx={{ transform: 'rotate(-45deg)' }} />
                                        </IconButton>
                                    </CopyToClipboard>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Transitions>
                </Grid>
            ))}
        </Grid>
    );
};

export default MybetsHistory;
