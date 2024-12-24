import { Close } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import { useDispatch } from 'store';
import { ChangePage } from 'store/reducers/menu';

import LogoSection from 'layout/MainLayout/LogoSection';
import { AuthCardWrapper, AuthWrapper } from 'ui-component';
import AuthResetPassword from './auth-forms/AuthResetPassword';

const ResetPassword = () => {
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
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                <FormattedMessage id="Reset Password" />
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                <FormattedMessage id="Please choose your new password" />
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthResetPassword />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default ResetPassword;
