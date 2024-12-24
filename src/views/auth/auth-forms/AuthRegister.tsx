import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ReCAPTCHA from 'react-google-recaptcha';
import { FormattedMessage, useIntl } from 'react-intl';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import config from 'config';
import { StringColorProps } from 'types';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';

import snackbar from 'utils/snackbar';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { CoinbaseWallet, injected, switchNetwork, WalletConnect } from 'utils/connectors';

import { useDispatch } from 'store';
import { ChangePage } from 'store/reducers/menu';

import Wallet from 'assets/images/icons/wallet.svg';
import Metamask from 'assets/images/icons/metamask.svg';
import Coinbase from 'assets/images/icons/coinbase.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AuthRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { formatMessage } = useIntl();
    const recaptchaInputRef = useRef({}) as any;
    const { account, activate, active } = useWeb3React();
    const { register, signUpAddress } = useApi();
    const { locale, borderRadius } = useConfig();
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState<StringColorProps>();

    const metamaskHandler = () => {
        signUpAddress(account as string)
            .then(({ data }: any) => {
                dispatch(ChangePage('login'));
                snackbar(data);
            })
            .catch((error) => {
                setLoading(false);
                setIsLogin(false);
            });
    };

    const registerHandler = async (
        values: { email: string; username: string; password: string },
        { setErrors, setStatus, setSubmitting }: any
    ) => {
        if (!checked || !recaptcha) return;
        try {
            await register(values.email, values.username, values.password, recaptcha)
                .then(
                    ({ data }: any) => {
                        dispatch(ChangePage('login'));
                        snackbar(data);
                    },
                    (err: any) => {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                )
                .catch((error) => {
                    if (recaptchaInputRef.current) {
                        recaptchaInputRef.current.reset();
                    }
                });
        } catch (err: any) {
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const onTerms = () => {
        dispatch(ChangePage(''));
        history('/pages/terms');
    };

    const handleClick = async (params: any) => {
        setIsLogin(true);
        // await switchNetwork('ethereum');
        if (!active) {
            activate(params, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(params);
                }
            });
        }
    };

    useEffect(() => {
        changePassword('');
    }, []);

    useEffect(() => {
        if (active && isLogin) metamaskHandler();
        // eslint-disable-next-line
    }, [active, isLogin]);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-around">
                        <AnimateButton>
                            <Button
                                disabled={loading}
                                disableElevation
                                fullWidth
                                onClick={() => handleClick(injected)}
                                size="large"
                                variant="outlined"
                                sx={{
                                    color: 'grey.700',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                }}
                            >
                                <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 2 }}>
                                    {loading && <CircularProgress size={36} />}
                                    <img
                                        src={Metamask}
                                        alt="metamask"
                                        width={26}
                                        height={26}
                                        style={{
                                            position: 'absolute',
                                            transform: 'translate(-50%, -50%)',
                                            top: '50%',
                                            left: '50%'
                                        }}
                                    />
                                </Box>
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                disabled={loading}
                                disableElevation
                                fullWidth
                                onClick={() => handleClick(CoinbaseWallet)}
                                size="large"
                                variant="outlined"
                                sx={{
                                    color: 'grey.700',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                }}
                            >
                                <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 2 }}>
                                    {loading && <CircularProgress size={36} />}
                                    <img
                                        src={Coinbase}
                                        alt="coinbase"
                                        width={26}
                                        height={26}
                                        style={{
                                            position: 'absolute',
                                            transform: 'translate(-50%, -50%)',
                                            top: '50%',
                                            left: '50%'
                                        }}
                                    />
                                </Box>
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                disabled={loading}
                                disableElevation
                                fullWidth
                                onClick={() => handleClick(WalletConnect)}
                                size="large"
                                variant="outlined"
                                sx={{
                                    color: 'grey.700',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                }}
                            >
                                <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 2 }}>
                                    {loading && <CircularProgress size={36} />}
                                    <img
                                        src={Wallet}
                                        alt="wallet"
                                        width={26}
                                        height={26}
                                        style={{
                                            position: 'absolute',
                                            transform: 'translate(-50%, -50%)',
                                            top: '50%',
                                            left: '50%'
                                        }}
                                    />
                                </Box>
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            <FormattedMessage id="OR" />
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography className="h6">
                            <FormattedMessage id="Sign up with Email address" />
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email(formatMessage({ id: 'Must be a valid email' }))
                        .max(255)
                        .required(formatMessage({ id: 'Email is required' })),
                    username: Yup.string()
                        .max(255)
                        .required(formatMessage({ id: 'Username is required' })),
                    password: Yup.string()
                        .max(255)
                        .required(formatMessage({ id: 'Password is required' }))
                })}
                onSubmit={registerHandler}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">
                                <FormattedMessage id="Email Address" />
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                label={formatMessage({ id: 'Email Address' })}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-username-register">
                                <FormattedMessage id="Username" />
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-register"
                                type="username"
                                value={values.username}
                                name="username"
                                label={formatMessage({ id: 'Username' })}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">
                                <FormattedMessage id="Password" />
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label={formatMessage({ id: 'Password' })}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography className="h6" fontSize="0.75rem">
                                                <FormattedMessage id={level?.label} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Stack direction="row">
                                            <Typography className="h6">
                                                <FormattedMessage id="Agree with" />
                                                &nbsp;
                                            </Typography>
                                            <Typography
                                                className="h6"
                                                onClick={onTerms}
                                                sx={{ display: 'inline', textDecoration: 'underline' }}
                                            >
                                                <FormattedMessage id="Terms & Condition" />.
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    <FormattedMessage id="Sign up" />
                                </Button>
                            </AnimateButton>
                        </Box>
                        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 2, width: '100%' }}>
                            <ReCAPTCHA
                                size="normal"
                                sitekey={config.RECAPTCHA_SITE_KEY}
                                ref={recaptchaInputRef}
                                onChange={setRecaptcha}
                                onExpired={() => setRecaptcha(null)}
                                hl={locale}
                            />
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
