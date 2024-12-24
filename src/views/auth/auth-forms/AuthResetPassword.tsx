import React, { useEffect } from 'react';

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { FormattedMessage } from 'react-intl';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { StringColorProps } from 'types';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import AnimateButton from 'ui-component/extended/AnimateButton';

const AuthResetPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

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

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <Formik
            initialValues={{
                email: 'info@codedthemes.com',
                password: '123456',
                confirmPassword: '123456',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string().max(255).required('Password is required'),
                confirmPassword: Yup.string().when('password', {
                    is: (val: string) => !!(val && val.length > 0),
                    then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
                })
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err: any) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-reset">
                            <FormattedMessage id="Password" />
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-reset"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
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
                    </FormControl>
                    {touched.password && errors.password && (
                        <FormControl fullWidth>
                            <FormHelperText error id="standard-weight-helper-text-reset">
                                {errors.password}
                            </FormHelperText>
                        </FormControl>
                    )}
                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box
                                            style={{ backgroundColor: level?.color }}
                                            sx={{
                                                width: 85,
                                                height: 8,
                                                borderRadius: '7px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography className="h6" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}

                    <FormControl
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">
                            <FormattedMessage id="Confirm Password" />
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type="password"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            label="Confirm Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                    </FormControl>

                    {touched.confirmPassword && errors.confirmPassword && (
                        <FormControl fullWidth>
                            <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                {' '}
                                {errors.confirmPassword}{' '}
                            </FormHelperText>
                        </FormControl>
                    )}

                    {errors.submit && (
                        <Box
                            sx={{
                                mt: 3
                            }}
                        >
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box
                        sx={{
                            mt: 1
                        }}
                    >
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
                                <FormattedMessage id="Reset Password" />
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthResetPassword;
