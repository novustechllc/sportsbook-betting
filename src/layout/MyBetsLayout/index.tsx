import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import { WTab, WTabs } from 'ui-component';
import { MyBetsIcon } from 'ui-component/SvgIcon';

const MyBetsLayout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabChangeHandler = (event: React.SyntheticEvent, index: number) => {
        const routeContent = ['/my-bets', '/my-bets/settled', '/my-bets/history'];
        navigate(routeContent[index]);
        setActiveTab(index);
    };

    useEffect(() => {
        const path = document.location.pathname.toString();
        if (path === '/my-bets') {
            setActiveTab(0);
        }
        if (path === '/my-bets/settled') {
            setActiveTab(1);
        }
    }, [pathname]);

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} ml={1} mt={1}>
                <MyBetsIcon />
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: '700'
                    }}
                >
                    <FormattedMessage id="My Bets" />
                </Typography>
            </Stack>
            <WTabs value={activeTab} onChange={tabChangeHandler} aria-label="icon">
                <WTab label={<FormattedMessage id="Active" />} iconPosition="start" />
                <WTab label={<FormattedMessage id="Settled" />} iconPosition="start" />
                <WTab label={<FormattedMessage id="history" />} iconPosition="start" />
            </WTabs>
            <Outlet />
        </>
    );
};

export default MyBetsLayout;
