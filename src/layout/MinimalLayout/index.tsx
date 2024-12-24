import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';

import useConfig from 'hooks/useConfig';

import Footer from 'layout/Footer';
import Header from 'layout/MainLayout/Header';

import Auth from '../AuthLayout';

const MinimalLayout = () => {
    const { navType } = useConfig();

    const header = useMemo(
        () => (
            <Toolbar>
                <Header />
            </Toolbar>
        ),
        []
    );
    return (
        <Box>
            <Auth />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    background: navType === 'dark' ? '#0A0E16' : '#fff',
                    borderBottom: '#3F4357 solid 1px'
                }}
            >
                <Container maxWidth="lg">{header}</Container>
            </AppBar>
            <PerfectScrollbar style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>
                <Outlet />
                <Container maxWidth="lg">
                    <Footer />
                </Container>
            </PerfectScrollbar>
        </Box>
    );
};

export default MinimalLayout;
