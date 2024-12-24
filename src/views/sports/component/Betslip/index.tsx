import { memo } from 'react';
import { Box, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { IconReceipt } from '@tabler/icons';

import { FormattedMessage } from 'react-intl';

import useConfig from 'hooks/useConfig';

import { useDispatch, useSelector } from 'store';
import { openBetslip } from 'store/reducers/sports';

import { StyledBadge } from 'ui-component';

import Tabs from './Tabs';

const Betslip = () => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:767px)');
    const isDesktop = useMediaQuery('(min-width:1440px)');

    const { betslipData, betslipOpen } = useSelector((state) => state.sports);
    const width = isMobile ? '100vw' : '370px';
    const dWidth = betslipOpen ? width : 0;

    return (
        <Box
            component="nav"
            sx={{
                ...(!isDesktop && {
                    position: 'fixed',
                    zIndex: 9999
                }),
                width: dWidth,
                transition: theme.transitions.create('all'),
                order: 1
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="persistent"
                anchor="right"
                open
                onClose={() => dispatch(openBetslip(!betslipOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: dWidth,
                        transition: theme.transitions.create('all'),
                        background: '#191919',
                        borderLeft: 'none',
                        boxShadow
                    }
                }}
            >
                <Stack
                    sx={{
                        height: '80px',
                        minHeight: '80px',
                        padding: '0 1.2rem',
                        flexDirection: 'row',
                        position: 'relative',
                        alignItems: 'center',
                        background: '#191919',
                        justifyContent: 'space-between',
                        boxShadow
                    }}
                >
                    <StyledBadge badgeContent={betslipData?.length} color="primary">
                        <Stack
                            sx={{
                                flexDirection: 'row',
                                position: 'relative',
                                alignItems: 'center'
                            }}
                        >
                            <IconReceipt stroke={1.5} size="1.5rem" color="#fff" />
                            <Typography
                                sx={{
                                    ml: 1,
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    lineHeight: '100%',
                                    color: '#fff'
                                }}
                            >
                                <FormattedMessage id="Bet Slip" />
                            </Typography>
                        </Stack>
                    </StyledBadge>
                    <IconButton size="small" onClick={() => dispatch(openBetslip(!betslipOpen))}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Tabs />
            </Drawer>
        </Box>
    );
};

export default memo(Betslip);
