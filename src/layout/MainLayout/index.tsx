import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar, Box, Container, CssBaseline, Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import useConfig from 'hooks/useConfig';
import { useSelector } from 'store';
import { drawerWidth } from 'store/constant';

import { Main } from 'ui-component';
import Footer from 'layout/Footer';
// import { isMobile } from 'react-device-detect';

import Header from './Header';
// import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Auth from '../AuthLayout';
import Betslip from 'views/sports/component/Betslip';
import Advertisement from './Advertisement';
import RecentBets from './RecentBets';
import LiveMatches from './LiveMatches';

const MainLayout = ({ children }: any) => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const isMobile = useMediaQuery('(max-width:767px)');
    const isTablet = useMediaQuery('(max-width:1000px)');
    const isDesktop = useMediaQuery('(min-width:1440px)');
    const { drawerOpen } = useSelector((state) => state.menu);
    const { betslipOpen } = useSelector((state) => state.sports);
    const Width = drawerOpen ? drawerWidth : drawerWidth - 210;
    const dWidth = betslipOpen ? Width + (isDesktop ? 370 : 0) : Width;

    const header = useMemo(
        () => (
            <Toolbar>
                <Header />
            </Toolbar>
        ),
        []
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Auth />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    zIndex: 1000,
                    width: '100vw',
                    transition: theme.transitions.create('all'),
                    boxShadow
                }}
            >
                <Container maxWidth="lg">{header}</Container>
            </AppBar>
            {/* <Sidebar /> */}
            <Betslip />
            <Main theme={theme} open={drawerOpen} dWidth={dWidth} sx={{ background: '#111111' }}>
                <Advertisement />
                <Grid container>
                    <Grid item lg={2} sm={12} xs={12} sx={{ marginBottom: '20px', marginTop: { lg: '180px' }, p: 1, order: { lg: 1, md: 3, sm: 3, xs: 3 } }}>
                        <LiveMatches />
                    </Grid>
                    <Grid item lg={8} sm={12} xs={12} sx={{ order: { lg: 2, md: 1, sm: 1, xs: 1 } }}>
                        <Box>
                            {children && children}
                            {!children && <Outlet />}
                        </Box>
                    </Grid>
                    <Grid item lg={2} sm={12} xs={12} sx={{ marginTop: { lg: '180px' }, p: 1, order: 2 }}>
                        <RecentBets />
                    </Grid>
                </Grid>
                <Container>
                    <Footer />
                </Container>
            </Main>
            {isMobile && <MobileMenu />}
        </Box>
    );
};

export default MainLayout;
