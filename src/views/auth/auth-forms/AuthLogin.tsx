import React, { useRef, useState } from 'react';

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    CircularProgress,
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

import config from 'config';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';

import { useDispatch } from 'store';
import { Login } from 'store/reducers/auth';
import { ChangePage } from 'store/reducers/menu';

import snackbar from 'utils/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthMetamask from './AuthMetamask';

const AuthLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const { formatMessage } = useIntl();
    const recaptchaInputRef = useRef({}) as any;
    const { borderRadius, locale } = useConfig();
    const dispatch = useDispatch();
    const { login } = useApi();
    const [checked, setChecked] = useState(true);
    const [recaptcha, setRecaptcha] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const loginHandler = async (values: { email: string; password: string }, { setErrors, setStatus, setSubmitting }: any) => {
        try {
            await login(values.email, values.password, recaptcha)
                .then(
                    ({ data }) => onLogin(data),
                    (err: any) => {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                        if (recaptchaInputRef.current) {
                            recaptchaInputRef.current.reset();
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
            if (recaptchaInputRef.current) {
                recaptchaInputRef.current.reset();
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const onLogin = (user: any) => {
        dispatch(Login(user));
        dispatch(ChangePage(''));
        snackbar(
            <>
                You have successfully logged in as a user to {process.env.REACT_APP_NAME}.
                <br />
                Now you can start to play. Enjoy!
            </>
        );
        if (
            window.location.pathname.toString().indexOf('blackjack') !== -1 ||
            window.location.pathname.toString().indexOf('roulette') !== -1
        ) {
            window.location.reload();
        }
    };

    return (
        <Grid container direction="column" justifyContent="center">
            <AuthMetamask />
        </Grid>
    );
};

export default AuthLogin;
