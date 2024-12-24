import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    useTheme,
    Avatar,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { IconLogout, IconReceipt, IconUser, IconWallet } from '@tabler/icons';
import { useWallet } from '@solana/wallet-adapter-react';

import { FormattedMessage } from 'react-intl';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

const ProfileSection = () => {
    const theme = useTheme();
    const { disconnect } = useWallet();

    const { borderRadius } = useConfig();
    const navigate = useNavigate();
    const { logout } = useApi();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<any>(null);
    const handleLogout = async () => {
        try {
            disconnect();
            await logout();
        } catch (err) {
            console.error(err);
        }
    };
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Avatar
                variant="rounded"
                sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    // color: theme.palette.primary.dark,
                    color: 'white',
                    transition: 'all .2s ease-in-out',
                    '&[aria-controls="menu-list-grow"],&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: theme.palette.primary.main,
                        color: theme.palette.primary.light
                    }
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <PersonIcon sx={{ cursor: 'pointer' }} />
            </Avatar>
            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 200,
                                                minWidth: 150,
                                                py: 0,
                                                backgroundColor: theme.palette.background.paper,
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                    handleListItemClick(event, 0, '/user/wallet')
                                                }
                                            >
                                                <ListItemIcon>
                                                    <IconWallet stroke={1.5} size="20px" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2">
                                                            <FormattedMessage id="Wallet" />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                    handleListItemClick(event, 1, '/user/account')
                                                }
                                            >
                                                <ListItemIcon>
                                                    <IconUser stroke={1.5} size="20px" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2">
                                                            <FormattedMessage id="Account" />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                    handleListItemClick(event, 2, '/my-bets')
                                                }
                                            >
                                                <ListItemIcon>
                                                    <IconReceipt stroke={1.5} size="20px" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2">
                                                            <FormattedMessage id="My Bets" />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton sx={{ borderRadius: `${borderRadius}px` }} onClick={handleLogout}>
                                                <ListItemIcon>
                                                    <IconLogout stroke={1.5} size="20px" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2">
                                                            <FormattedMessage id="Logout" />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        </List>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
