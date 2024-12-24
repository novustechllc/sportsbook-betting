import { useRef, useState } from 'react';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';
import ReCAPTCHA from 'react-google-recaptcha';

import * as Yup from 'yup';
import { Formik } from 'formik';

import config from 'config';
import snackbar from 'utils/snackbar';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';

import { useDispatch } from 'store';
import { ChangePage } from 'store/reducers/menu';

import AnimateButton from 'ui-component/extended/AnimateButton';

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const { forgotPassword } = useApi();
    const { formatMessage } = useIntl();
    const { locale } = useConfig();
    const recaptchaInputRef = useRef({}) as any;
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const forgotHandler = async (values: { email: string }, { setErrors, setStatus, setSubmitting }: any) => {
        if (!recaptcha) return;
        try {
            await forgotPassword(values.email, recaptcha)
                .then(
                    ({ data }) => {
                        dispatch(ChangePage('login'));
                        setStatus({ success: true });
                        setSubmitting(false);
                        snackbar(formatMessage({ id: 'Check mail for reset password link.' }));
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

    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email(formatMessage({ id: 'Must be a valid email' }))
                    .max(255)
                    .required(formatMessage({ id: 'Email is required' }))
            })}
            onSubmit={forgotHandler}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">
                            <FormattedMessage id="Email Address / Username" />
                        </InputLabel>
                        <OutlinedInput
                            name="email"
                            type="email"
                            id="outlined-adornment-email-forgot"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label={formatMessage({ id: 'Email Address / Username' })}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                <FormattedMessage id="Send Mail" />
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
    );
};

export default AuthForgotPassword;
