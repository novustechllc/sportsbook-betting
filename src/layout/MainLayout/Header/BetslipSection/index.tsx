import { Avatar, Badge, Box, useTheme } from '@mui/material';

import { IconReceipt } from '@tabler/icons';

import { useDispatch, useSelector } from 'store';
import { openBetslip } from 'store/reducers/sports';

const NotificationSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { betslipOpen, betslipData } = useSelector((state) => state.sports);

    const handleClick = () => {
        dispatch(openBetslip(!betslipOpen));
    };

    return (
        <Box
            sx={{
                mx: 2,
                [theme.breakpoints.down('md')]: {
                    mx: 1
                }
            }}
        >
            <Badge badgeContent={betslipData.length} color="primary">
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        border: '1px solid',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        // color: theme.palette.primary.dark,
                        color: 'white',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    onClick={handleClick}
                    color="inherit"
                >
                    <IconReceipt stroke={1.5} size="20px" />
                </Avatar>
            </Badge>
        </Box>
    );
};

export default NotificationSection;
