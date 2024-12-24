import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';

import { FormattedMessage } from 'react-intl';

import Axios from 'utils/axios';

import { SetBetsId } from 'store/reducers/auth';
import { ChangePage } from 'store/reducers/menu';
import { useDispatch, useSelector } from 'store';

import Loader from 'ui-component/Loader';
import Chip from 'ui-component/extended/Chip';
import { StatusIcon } from 'ui-component/SvgIcon';
import OddNum from 'views/sports/component/OddNum';
import { AuthCardWrapper, AuthWrapper } from 'ui-component';
import AnimateButton from 'ui-component/extended/AnimateButton';
import LogoSection from 'layout/MainLayout/LogoSection';

interface BettingProps {
    eventId: string;
    status: string;
    HomeTeam: string;
    AwayTeam: string;
    marketName: string;
    oddName: string;
    odds: number;
}

interface DataProps {
    betType: number;
    bettings: BettingProps[];
}

interface HistoryProps {
    data?: DataProps[];
    type?: string;
    single?: string;
    username?: string;
    count?: number;
    total?: number;
}

const Bets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { betsId } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<HistoryProps>({});

    const otherPage = () => {
        dispatch(ChangePage(''));
        dispatch(SetBetsId(''));
    };

    const getBettingHistory = () => {
        if (!betsId) return;
        setLoading(true);
        Axios.post('api/v2/sports/bet-history', { betsId })
            .then(({ data }) => {
                setHistory(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getBettingHistory();
        // eslint-disable-next-line
    }, []);

    if (loading) return <Loader />;
    return (
        <AuthWrapper>
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                    <AuthCardWrapper>
                        <Grid sx={{ position: 'relative' }} container spacing={2} alignItems="center" justifyContent="center">
                            <IconButton
                                color="inherit"
                                size="large"
                                disableRipple
                                onClick={otherPage}
                                sx={{ position: 'absolute', right: 0, top: 0, px: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Grid item>
                                <LogoSection />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IosShareIcon fontSize="large" color="primary" />
                                    <Stack>
                                        <Typography color="primary.main">{history.username}</Typography>
                                        <Typography>shared bets with you</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Chip label={(history.type || '').toUpperCase()} variant="outlined" chipcolor="success" size="small" />
                                <Chip label={String(history.count)} variant="outlined" chipcolor="success" size="small" sx={{ ml: 1 }} />
                            </Grid>
                            <Grid item xs={12}>
                                {history.data &&
                                    history.data.map((betting) =>
                                        betting.bettings.map((item, key) => (
                                            <Card key={key} sx={{ background: '#0a0e16', p: 2, mb: 0.5 }}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <StatusIcon status={item.status} />
                                                    <Typography
                                                        onClick={() => navigate(`/events/${item.eventId}`)}
                                                        sx={{ pt: 0.5, cursor: 'pointer' }}
                                                    >
                                                        {`${item.HomeTeam} - ${item.AwayTeam}`}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="body2">
                                                    {item.marketName && <FormattedMessage id={item.marketName} />}
                                                </Typography>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2" color="white">
                                                        {item.oddName}
                                                    </Typography>
                                                    <OddNum odd={item.odds} color="primary" />
                                                </Stack>
                                            </Card>
                                        ))
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between" px={1}>
                                    <Typography variant="body2">Total Odds:</Typography>
                                    <Typography variant="body2">{(history.total || 0).toFixed(2)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button fullWidth variant="contained" onClick={otherPage}>
                                        Please Bet
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Bets;
