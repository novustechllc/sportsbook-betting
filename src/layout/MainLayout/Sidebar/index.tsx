import { memo } from 'react';

import { Avatar, Box, Drawer, IconButton, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { IconMenu2 } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { drawerWidth } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';

import useConfig from 'hooks/useConfig';
import AnimateButton from 'ui-component/extended/AnimateButton';

import MenuList from './MenuList';
import Localization from './Localization';

const Sidebar = () => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const matchUpMd = useMediaQuery('(min-width:768px)');

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const dWidth = drawerOpen ? drawerWidth : drawerWidth - 210;

    const pri = !drawerOpen ? 'persistent' : 'temporary';
    const radius = drawerOpen ? '50px' : 0;

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? dWidth : 'auto',
                transition: theme.transitions.create('all')
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant={matchUpMd ? 'persistent' : pri}
                anchor="left"
                open
                onClose={() => dispatch(openDrawer(!drawerOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: `${dWidth}px`,
                        transition: theme.transitions.create('all'),
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        boxShadow,
                        '@media (max-width: 767px)': {
                            width: drawerOpen ? '100vw' : 0
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        height: '80px',
                        minHeight: '80px',
                        alignItems: 'center',
                        display: 'flex',
                        background: '#171b26',
                        transition: theme.transitions.create('all'),
                        boxShadow
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            // background: '#212637',
                            borderTopRightRadius: matchUpMd ? radius : '0'
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: `0 ${drawerOpen ? 28 : 18}px`,
                            justifyContent: drawerOpen ? 'flex-start' : 'center',
                            height: '100%'
                        }}
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                overflow: 'hidden',
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                                }
                            }}
                            onClick={() => dispatch(openDrawer(!drawerOpen))}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="20px" />
                        </Avatar>
                        <Typography
                            sx={{
                                ml: 2,
                                zIndex: 1,
                                color: '#fff',
                                minWidth: 'calc(100% - 75px)',
                                whiteSpace: 'nowrap',
                                transition: theme.transitions.create('all'),
                                display: drawerOpen ? 'block' : 'none'
                            }}
                            variant="h3"
                        >
                            <FormattedMessage id="All Service" />
                        </Typography>
                        {drawerOpen && !matchUpMd && (
                            <IconButton size="small" onClick={() => dispatch(openDrawer(false))}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <PerfectScrollbar
                    component="div"
                    style={{
                        background: '#191d2e',
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 72px)',
                        paddingTop: '10px',
                        paddingLeft: drawerOpen ? '12px' : '5px',
                        paddingRight: drawerOpen ? '12px' : '5px'
                    }}
                >
                    <MenuList />
                </PerfectScrollbar>
                <Stack sx={{ background: '#191d2e', pl: drawerOpen ? 2 : 1, pb: 2 }} spacing={1}>
                    <Stack spacing={1}>
                        {drawerOpen && (
                            <Typography
                                sx={{
                                    ml: 1,
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    lineHeight: '22px',
                                    color: '#6E7388',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <FormattedMessage id="Our partners" />
                            </Typography>
                        )}
                        <Stack direction={drawerOpen ? 'row' : 'column'} spacing={1}>
                            <AnimateButton>
                                <Link href="https://www.marshallroganinu.com/" target="_blank">
                                    <Stack
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // background: '#212637',
                                            borderRadius: '20px',
                                            boxShadow,
                                            cursor: 'pointer',
                                            width: drawerOpen ? '65px' : '55px',
                                            height: drawerOpen ? '65px' : '55px'
                                        }}
                                    >
                                        <img
                                            src="https://boibook.io/marshallroganinu.jpg"
                                            style={{ width: '2rem', height: '2rem' }}
                                            alt=""
                                        />
                                    </Stack>
                                </Link>
                            </AnimateButton>
                        </Stack>
                    </Stack>
                    <Localization />
                </Stack>
            </Drawer>
        </Box>
    );
};

export default memo(Sidebar);
