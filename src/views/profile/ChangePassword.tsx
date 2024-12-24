import { useState } from 'react';
import {
    Box,
    Button,
    CardActions,
    CircularProgress,
    Divider,
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { FormattedMessage, useIntl } from 'react-intl';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { StringColorProps } from 'types';
import { gridSpacing } from 'store/constant';

import useApi from 'hooks/useApi';
import useScriptRef from 'hooks/useScriptRef';

import snackbar from 'utils/snackbar';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import AnimateButton from 'ui-component/extended/AnimateButton';

const ChangePassword = () => {
    const Api = useApi();
    const theme = useTheme();
    const { formatMessage } = useIntl();
    const [strength, setStrength] = useState<number>(0);
    const [level, setLevel] = useState<StringColorProps>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const scriptedRef = useScriptRef();

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const changeHandler = async (
        values: { confirmPassword: string; currentPassword: string; password: string },
        { setErrors, setStatus, setSubmitting }: any
    ) => {
        try {
            await Api.changePassword({ 'Current Password': values.currentPassword, Password: values.password })
                .then(
                    ({ data }) => {
                        snackbar(formatMessage({ id: 'Success!' }));
                    },
                    (err: any) => {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
        } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    <FormattedMessage id="Change Password" />
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '1rem' }}>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                        currentPassword: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string()
                            .max(255)
                            .required(formatMessage({ id: 'Password is required' })),
                        currentPassword: Yup.string()
                            .max(255)
                            .required(formatMessage({ id: 'Current Password is required' })),
                        confirmPassword: Yup.string().when('password', {
                            is: (val: string) => !!(val && val.length > 0),
                            then: Yup.string().oneOf([Yup.ref('password')], formatMessage({ id: 'Both Password must be match!' }))
                        })
                    })}
                    onSubmit={changeHandler}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid item xs={12} sm={12}>
                                <Grid container columnSpacing={gridSpacing}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.currentPassword && errors.currentPassword)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-confirm-password">
                                                <FormattedMessage id="Current Password" />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-confirm-password"
                                                type="password"
                                                value={values.currentPassword}
                                                name="currentPassword"
                                                label={formatMessage({ id: 'Current Password' })}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                            />
                                        </FormControl>
                                        {touched.currentPassword && errors.currentPassword && (
                                            <FormControl fullWidth>
                                                <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                                    {' '}
                                                    {errors.currentPassword}{' '}
                                                </FormHelperText>
                                            </FormControl>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password-reset">
                                                <FormattedMessage id="Password" />
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password-reset"
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
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                                label={formatMessage({ id: 'Confirm Password' })}
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
                                    </Grid>
                                </Grid>
                            </Grid>
                            {errors.submit && (
                                <Box
                                    sx={{
                                        mt: 3
                                    }}
                                >
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Grid item xs={12} sm={12}>
                                <CardActions sx={{ pt: 2, p: 0 }}>
                                    <Grid spacing={2} container justifyContent="flex-end">
                                        <Grid item>
                                            <AnimateButton>
                                                <Button disableElevation disabled={isSubmitting} fullWidth type="submit" variant="outlined">
                                                    {isSubmitting && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                                    <FormattedMessage id="Change Password" />
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};
export default ChangePassword;
