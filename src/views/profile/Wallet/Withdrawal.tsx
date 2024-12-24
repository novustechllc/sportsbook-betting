import { forwardRef, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    CardContent,
    CardProps,
    CircularProgress,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { FormattedMessage, useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';

import { useSelector } from 'store';
import useApi from 'hooks/useApi';

import snackbar from 'utils/snackbar';
import { toNumberTag } from 'utils/number';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    functions: any;
    getTransactions: Function;
    getBalances: Function;
}

const Withdrawal = forwardRef(({ modalStyle, functions, getTransactions, getBalances }: Props, ref: React.Ref<HTMLDivElement>) => {
    const Api = useApi();
    const theme = useTheme();
    const { account } = useWeb3React();
    const { formatMessage } = useIntl();
    const { currency, balance } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [amount, setAmount] = useState<number | string>('');
    const [method, setMethod] = useState<number>(0);

    const withdrawalHandler = async () => {
        if (balance < amount) {
            snackbar(formatMessage({ id: 'Balances not enough.' }), 'error');
        } else if (!address) {
            snackbar(formatMessage({ id: 'Address is invalid.' }), 'error');
        } else if (Number(currency.minWithdraw) > amount) {
            snackbar(`Minimum withdraw ${currency.minWithdraw} ${currency.symbol}`, 'error');
        } else {
            setLoading(true);
            Api.withdrawal(address, method, Number(amount))
                .then(({ data }) => {
                    snackbar(formatMessage({ id: 'Success!' }));
                    setAmount('');
                    getTransactions();
                    getBalances();
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        setMethod(1);
    }, [currency]);

    useEffect(() => {
        if (account) setAddress(account);
    }, [account]);

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
                divider={false}
                title={`${formatMessage({ id: 'Withdrawal' })} ${currency.name}`}
                content={false}
                secondary={
                    <IconButton onClick={functions.onWithdrawalVisible}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{ mb: 2, pt: 0 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setAmount(balance)}
                            >
                                <img src={currency.icon} alt="metamask" width={20} height={20} />
                                <Typography className="h6">
                                    {toNumberTag(balance)} {currency.symbol} <FormattedMessage id="Available" />
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                fullWidth
                                label={formatMessage({ id: 'Withdrawal amount' })}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                fullWidth
                                label={formatMessage({ id: 'Wallet address' })}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Alert variant="outlined" severity="warning" sx={{ borderColor: theme.palette.warning.main }}>
                                <FormattedMessage id="Minimum Withdrawal" />: {currency.minWithdraw} {currency.symbol}
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    disabled={loading || amount === '' || Number(amount) === 0}
                                    disableElevation
                                    fullWidth
                                    onClick={withdrawalHandler}
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        color: 'grey.700',
                                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                    }}
                                >
                                    {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                    <FormattedMessage id="Withdrawal" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </div>
    );
});

export default Withdrawal;
