import { useEffect, useRef, useState } from 'react';

import {
    useTheme,
    Box,
    ClickAwayListener,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ReactCountryFlag from 'react-country-flag';

import { useSelector } from 'store';
import useConfig from 'hooks/useConfig';

import Axios from 'utils/axios';
import { languageCodes } from 'utils/sports';

import Transitions from 'ui-component/extended/Transitions';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Localization = () => {
    const { borderRadius, locale, boxShadow, onChangeLocale } = useConfig();
    const { drawerOpen } = useSelector((state) => state.menu);

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const anchorRef = useRef<any>(null);
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState<string>(locale);
    const [langObj, setLangObj] = useState([{ value: 'en', label: 'English' }]);

    const handleListItemClick = (lng: string) => {
        setLanguage(lng);
        onChangeLocale(lng);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
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

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    useEffect(() => {
        Axios.post('api/v1/languages/language/', {}).then(({ data }) => {
            setLangObj(data);
        });
    }, []);

    return (
        <>
            <AnimateButton>
                <Box sx={{ transition: theme.transitions.create('all') }}>
                    <Box
                        sx={{
                            // background: '#212637',
                            py: 1.5,
                            px: drawerOpen ? 2 : 1.5,
                            borderRadius: drawerOpen ? '50px' : '20px',
                            minWidth: drawerOpen ? '150px' : '55px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            boxShadow
                        }}
                        ref={anchorRef}
                        onClick={handleToggle}
                    >
                        <ReactCountryFlag
                            countryCode={languageCodes.find((e: any) => e.value === language.toLowerCase())?.code || 'en'}
                            style={{ width: '31px', height: '31px', border: '2px solid #3F4357', borderRadius: '31px' }}
                            svg
                        />
                        {drawerOpen && (
                            <>
                                <Typography
                                    sx={{
                                        ml: 0.5,
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        lineHeight: '20px',
                                        color: '#3F4357'
                                    }}
                                >
                                    {languageCodes.find((e: any) => e.value === language.toLowerCase())?.label || 'English'}
                                </Typography>
                                {open ? (
                                    <KeyboardArrowUpIcon sx={{ color: '#3F4357' }} />
                                ) : (
                                    <KeyboardArrowRightIcon sx={{ color: '#3F4357' }} />
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </AnimateButton>
            <Popper
                placement={matchesXs ? 'bottom-start' : 'bottom'}
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
                                offset: [matchesXs ? 0 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={matchesXs ? 'top-left' : 'top'} in={open} {...TransitionProps}>
                            <Paper elevation={16}>
                                {open && (
                                    <List
                                        component="nav"
                                        sx={{
                                            width: drawerOpen ? '150px' : '100%',
                                            bgcolor: theme.palette.background.paper,
                                            borderRadius: `${borderRadius}px`
                                        }}
                                    >
                                        {langObj.map((item, key) => (
                                            <ListItemButton
                                                key={key}
                                                selected={language === item.value}
                                                onClick={() => handleListItemClick(item.value)}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Grid container>
                                                            <ReactCountryFlag
                                                                countryCode={
                                                                    languageCodes.find((e: any) => e.value === item.value.toLowerCase())
                                                                        ?.code || 'en'
                                                                }
                                                                style={{ width: '1rem', height: '1rem' }}
                                                                title={item.label}
                                                                svg
                                                            />
                                                            {drawerOpen && (
                                                                <Typography sx={{ ml: 0.5 }} color="textPrimary">
                                                                    {item.label}
                                                                </Typography>
                                                            )}
                                                        </Grid>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default Localization;
