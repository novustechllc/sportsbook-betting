import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CardContent, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';
import CreditCardIcon from '@mui/icons-material/CreditCardTwoTone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsTwoTone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineTwoTone';

import { FormattedMessage } from 'react-intl';

import useConfig from 'hooks/useConfig';
import config from 'config';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const tabsOption = [
    {
        label: <FormattedMessage id="Wallet" />,
        link: '/user/wallet',
        icon: <CreditCardIcon />
    },
    {
        label: <FormattedMessage id="Account" />,
        link: '/user/account',
        icon: <PersonOutlineIcon />
    },
    {
        label: <FormattedMessage id="Referral" />,
        link: '/user/referral',
        icon: <EmojiEventsIcon />
    },
    {
        label: <FormattedMessage id="Preferences" />,
        link: '/user/preferences',
        icon: <SettingsIcon />
    }
];

const NavItem = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const [value, setValue] = useState<number>(0);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        navigate(tabsOption[newValue].link);
        setValue(newValue);
    };
    useEffect(() => {
        const currentIndex = tabsOption.findIndex((e) => document.location.pathname.toString() === e.link);
        if (currentIndex !== -1) {
            setValue(currentIndex);
        }
    }, [pathname]);

    return (
        <CardContent style={{ padding: 0 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                    '& .MuiTabs-flexContainer': {
                        borderBottom: 'none'
                    },
                    '& button': {
                        color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                        minHeight: 'auto',
                        minWidth: '100%',
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        borderRadius: `${borderRadius}px`
                    },
                    '& button.Mui-selected': {
                        color: config.grey2,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                        '& p': {
                            color: config.grey2
                        }
                    },
                    '& button > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25,
                        height: 20,
                        width: 20
                    },
                    '& button > div > span': {
                        display: 'block'
                    },
                    '& > div > span': {
                        display: 'none'
                    }
                }}
            >
                {tabsOption.map((tab, index) => (
                    <Tab
                        key={index}
                        icon={tab.icon}
                        label={
                            <Grid container direction="column">
                                <Typography className="h6" color="inherit">
                                    {tab.label}
                                </Typography>
                            </Grid>
                        }
                        {...a11yProps(index)}
                    />
                ))}
            </Tabs>
        </CardContent>
    );
};

export default memo(NavItem);
