import { Close } from '@mui/icons-material';
import { Divider, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import { useDispatch } from 'store';
import { ChangePage } from 'store/reducers/menu';

import LogoSection from 'layout/MainLayout/LogoSection';
import { AuthCardWrapper, AuthWrapper } from 'ui-component';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthForgotPassword from './auth-forms/AuthForgotPassword';

const ForgotPassword = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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
                                onClick={() => dispatch(ChangePage(''))}
                                sx={{ position: 'absolute', right: 0, top: 0, px: 0 }}
                            >
                                <Close />
                            </IconButton>
                            <Grid item>
                                <LogoSection />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                            <FormattedMessage id="Forgot Password?" />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" fontSize="16px" textAlign="center">
                                            <FormattedMessage id="Enter your email address below and we'll send you password reset Link." />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthForgotPassword />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="center" xs={12}>
                                    <AnimateButton>
                                        <Typography onClick={() => dispatch(ChangePage('login'))} className="h6" sx={{ cursor: 'pointer' }}>
                                            <FormattedMessage id="Already have an account?" />
                                        </Typography>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default ForgotPassword;
