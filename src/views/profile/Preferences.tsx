import { useEffect, useState } from 'react';
import { Button, CardActions, CircularProgress, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';

import { gridSpacing } from 'store/constant';
import { UpdateInfo } from 'store/reducers/auth';
import { dispatch, useSelector } from 'store';

import AnimateButton from 'ui-component/extended/AnimateButton';

const OddsFormat = [
    { value: 'decimal', label: 'Decimal' },
    { value: 'moneyline', label: 'American' },
    { value: 'indonesian', label: 'Indonesian' },
    { value: 'hongKong', label: 'Hong kong' },
    { value: 'malay', label: 'Malaysian' }
];

interface SelectProps {
    value: string;
    label: string;
}

const Preferences = () => {
    const Api = useApi();
    const { formatMessage } = useIntl();
    const { locale, onChangeLocale } = useConfig();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [oddsformat, setOddsFormat] = useState<string>('');
    const [langObj, setLangObj] = useState<SelectProps[]>([{ value: 'en', label: 'English' }]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOddsFormat(event.target.value);
    };

    const UpdateFormat = () => {
        setLoading(true);
        Api.updateUserInfo({
            oddsformat,
            update: false
        })
            .then(({ data }) => {
                snackbar(formatMessage({ id: 'Success!' }));
                dispatch(UpdateInfo(data));
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const getLanguages = () => {
        Axios.post('api/v1/languages/language', {}).then(({ data }) => {
            setLangObj(data);
        });
    };

    useEffect(() => {
        setOddsFormat(user?.oddsformat as string);
    }, [user]);

    useEffect(() => {
        getLanguages();
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    <FormattedMessage id="Preferences" />
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label={formatMessage({ id: 'Odds format' })}
                    value={oddsformat}
                    onChange={handleChange}
                >
                    {OddsFormat.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label={formatMessage({ id: 'Language' })}
                    value={locale}
                    onChange={(e) => onChangeLocale(e.target.value)}
                >
                    {langObj.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Divider sx={{ mb: 2 }} />
                <CardActions sx={{ pt: 2, p: 0 }}>
                    <Grid spacing={2} container justifyContent="flex-end">
                        <Grid item>
                            <AnimateButton>
                                <Button disabled={loading} onClick={UpdateFormat} variant="outlined">
                                    {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                    <FormattedMessage id="Update" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Grid>
        </Grid>
    );
};

export default Preferences;
