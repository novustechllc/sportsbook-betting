import { useState } from 'react';
import { useTheme, Avatar, Modal, Box, Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'store';
import { updateSearch } from 'store/reducers/sports';

const SearchSection = () => {
    const theme = useTheme();
    const dispacth = useDispatch();
    const { search } = useSelector((store) => store.sports);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
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
                onClick={handleOpen}
                color="inherit"
            >
                <SearchIcon sx={{ cursor: 'pointer' }} />
            </Avatar>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 'rgb(62 80 96 / 20%) 0px 4px 20px',
                        borderRadius: 'clamp(0px, (100vw - 750px) * 9999, 10px)',
                        width: 400,
                        '@media (max-width: 450px)': {
                            width: '90%'
                        }
                    }}
                >
                    <Paper
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <InputBase
                            value={search}
                            onChange={(e) => dispacth(updateSearch(e.target.value))}
                            type="search"
                            placeholder="Search..."
                            sx={{
                                ml: 1,
                                flex: 1,
                                fontSize: 18,
                                'input::placeholder': {
                                    fontSize: 18
                                }
                            }}
                        />
                        <IconButton sx={{ p: '10px' }}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
};

export default SearchSection;
