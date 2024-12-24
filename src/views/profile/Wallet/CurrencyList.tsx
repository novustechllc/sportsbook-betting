import { forwardRef, useEffect, useState } from 'react';
import {
    Button,
    CardMedia,
    Divider,
    CardContent,
    CardActions,
    Grid,
    IconButton,
    Stack,
    Typography,
    CardProps,
    Checkbox,
    CircularProgress,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import useApi from 'hooks/useApi';
import { gridSpacing } from 'store/constant';
import { BalanceProps, CurrencyProps } from 'types/payment';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    handleClose: () => void;
    balances: BalanceProps[];
    getBalances: Function;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CurrencyList = forwardRef(({ modalStyle, handleClose, balances, getBalances }: Props, ref: React.Ref<HTMLDivElement>) => {
    const Api = useApi();
    const { formatMessage } = useIntl();
    const [loading, setLoading] = useState<number>(0);
    const [currencies, setCurrencies] = useState<CurrencyProps[]>([]);

    const getCurrencies = () => {
        Api.getCurrency().then(({ data }) => {
            setCurrencies(data);
        });
    };

    const AddRemoveCurrency = (currency: string, index: number) => {
        if (loading) return;
        setLoading(index + 1);
        Api.addCurrency(currency)
            .then(({ data }) => {
                setTimeout(() => {
                    setLoading(0);
                }, 1000);
                getBalances();
            })
            .catch((error) => {
                setLoading(0);
            });
    };

    useEffect(() => {
        getCurrencies();
        // eslint-disable-next-line
    }, []);

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 450 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title={formatMessage({ id: 'Currencies' })}
                content={false}
                secondary={
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        {currencies.map((item: CurrencyProps, key: number) => {
                            const balance = balances.findIndex((e: BalanceProps) => e.currency?._id === item._id);
                            const checked = balance !== -1 || false;
                            const isLoading = loading === key + 1;
                            const disabled = (balances.length === 1 && checked) || loading !== 0;
                            return (
                                <Grid item xs={12} key={key}>
                                    <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                                <CardMedia component="img" image={item.icon} title="payment" sx={{ width: 30 }} />
                                                <Stack>
                                                    <Typography className="h6">
                                                        {item.name}&nbsp;({item.symbol})
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ position: 'relative', width: '24px', height: '24px' }}>
                                                {isLoading && <CircularProgress size={24} />}
                                                <Checkbox
                                                    {...label}
                                                    sx={{
                                                        position: 'absolute',
                                                        transform: 'translate(-50%, -50%)',
                                                        top: '50%',
                                                        left: '50%',
                                                        p: 0
                                                    }}
                                                    checked={checked}
                                                    disabled={disabled}
                                                    onClick={() => AddRemoveCurrency(item._id, key)}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Grid spacing={2} container justifyContent="flex-end">
                        <Grid item>
                            <AnimateButton>
                                <Button variant="text" color="error" size="small" onClick={handleClose}>
                                    <FormattedMessage id="Close" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </MainCard>
        </div>
    );
});

export default CurrencyList;
