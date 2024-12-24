import { Fragment, memo, useEffect, useState } from 'react';
import { Button, CardMedia, Divider, Grid, Modal, Stack, Typography, CircularProgress } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';

import useApi from 'hooks/useApi';
import { BalanceProps, CurrencyProps } from 'types/payment';

import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { UpdateBalances } from 'store/reducers/auth';

import snackbar from 'utils/snackbar';
import { toNumberTag } from 'utils/number';

import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import CurrencyList from './CurrencyList';
import DepositSolana from './DepositSolana';
import DepositMetamask from './DepositMetamask';
import DepositCoinpayment from './DepositCoinpayment';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const Balances = ({ getTransactions }: { getTransactions: Function }) => {
    const Api = useApi();
    const { formatMessage } = useIntl();
    const auth = useSelector((state) => state.auth);
    const [modalStyle] = useState(getModalStyle);
    const [loading, setLoading] = useState<number>(0);
    const [balances, setBalances] = useState<BalanceProps[]>([]);
    const [depositOpen, setDepositOpen] = useState<boolean>(false);
    const [currencyOpen, setCurrencyOpen] = useState<boolean>(false);
    const [withdrawal, setWithdrawalOpen] = useState<boolean>(false);
    const [depositMOpen, setDepositMOpen] = useState<boolean>(false);
    const [depositSOpen, setDepositSOpen] = useState<boolean>(false);
    const [depositCOpen, setDepositCOpen] = useState<boolean>(false);
    const [depositAddress, setDepositAddress] = useState<string>('');

    const getBalances = () => {
        Api.getBalances().then(({ data }) => {
            setBalances(data);
        });
    };

    const changeCurrency = (acurrency: string, index: number) => {
        if (loading) return;
        setLoading(index + 1);
        Api.changeCurrency(acurrency)
            .then(({ data }) => {
                getBalances();
                setLoading(0);
            })
            .catch((error) => {
                setLoading(0);
            });
    };

    const onDepositCoinPayment = (address?: string | undefined) => {
        if (address) {
            setDepositAddress(address);
        } else {
            Api.deposit().then(({ data }) => {
                setDepositAddress(data.address);
                functions.onDepositCVisible();
            });
        }
    };

    const onDeposit = (acurrency: CurrencyProps) => {
        if (!acurrency.deposit) {
            snackbar(formatMessage({ id: 'Deposit disabled!' }), 'error');
        } else if (acurrency.network === 'ethereum' || acurrency.network === 'binance') {
            setDepositMOpen(true);
        } else if (acurrency.network === 'solana') {
            setDepositSOpen(true);
        }
    };

    const onWithdrawal = (acurrency: CurrencyProps) => {
        if (!acurrency.withdrawal) {
            snackbar(formatMessage({ id: 'Withdrawal disabled!' }), 'error');
        } else {
            setWithdrawalOpen(true);
        }
    };

    useEffect(() => {
        getBalances();
        // eslint-disable-next-line
    }, [auth]);

    useEffect(() => {
        const cbalance = balances.find((balance) => balance.disabled === false && balance.status === true);
        if (!cbalance || !auth) return;
        if (auth.balanceId !== cbalance?._id || auth.currencyId !== cbalance?.currency._id) {
            dispatch(UpdateBalances(cbalance));
        }
    }, [balances, auth]);

    const functions = {
        onCurrencyVisible: () => setCurrencyOpen(!currencyOpen),
        onDepositVisible: () => setDepositOpen(!depositOpen),
        onWithdrawalVisible: () => setWithdrawalOpen(!withdrawal),
        onDepositMVisible: () => setDepositMOpen(!depositMOpen),
        onDepositSVisible: () => setDepositSOpen(!depositSOpen),
        onDepositCoinPayment: () => onDepositCoinPayment(),
        onDepositCVisible: () => setDepositCOpen(!depositCOpen)
    };

    return (
        <SubCard
            title={formatMessage({ id: 'Payment Methods' })}
            secondary={
                <AnimateButton>
                    <Button variant="contained" size="small" onClick={functions.onCurrencyVisible}>
                        <FormattedMessage id="Add / Remove Currency" />
                    </Button>
                </AnimateButton>
            }
        >
            <Grid container spacing={gridSpacing}>
                {balances.map((item: BalanceProps, key: number) => (
                    <Fragment key={key}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                        <CardMedia component="img" image={item.currency.icon} title="payment" sx={{ width: 40 }} />
                                        <Stack>
                                            <Typography className="h6">
                                                {item.currency.name}&nbsp;({item.currency.symbol})
                                            </Typography>
                                            <Typography variant="subtitle2">{toNumberTag(item.balance)}</Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    {item.status ? (
                                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                            <AnimateButton>
                                                <Button
                                                    variant="text"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => onDeposit(item.currency)}
                                                >
                                                    <FormattedMessage id="Deposit" />
                                                </Button>
                                            </AnimateButton>
                                            <Typography variant="caption" sx={{ color: 'grey.300' }}>
                                                |
                                            </Typography>
                                            <AnimateButton>
                                                <Button
                                                    variant="text"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => onWithdrawal(item.currency)}
                                                >
                                                    {loading === key + 1 && <CircularProgress size={24} />}&nbsp;
                                                    <FormattedMessage id="Withdrawal" />
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                            <AnimateButton>
                                                <Button
                                                    variant="text"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => changeCurrency(item.currency._id, key)}
                                                >
                                                    {loading === key + 1 && <CircularProgress size={24} />}&nbsp;
                                                    <FormattedMessage id="Use Currency" />
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {balances.length !== key + 1 && (
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        )}
                    </Fragment>
                ))}
            </Grid>
            <Modal open={currencyOpen} onClose={functions.onCurrencyVisible}>
                <CurrencyList
                    balances={balances}
                    modalStyle={modalStyle}
                    getBalances={getBalances}
                    handleClose={functions.onCurrencyVisible}
                />
            </Modal>
            <Modal open={depositOpen} onClose={functions.onDepositVisible}>
                <Deposit functions={functions} modalStyle={modalStyle} />
            </Modal>
            <Modal open={withdrawal} onClose={functions.onWithdrawalVisible}>
                <Withdrawal modalStyle={modalStyle} functions={functions} getTransactions={getTransactions} getBalances={getBalances} />
            </Modal>
            <Modal open={depositSOpen} onClose={functions.onDepositSVisible}>
                <DepositSolana modalStyle={modalStyle} functions={functions} />
            </Modal>
            <Modal open={depositMOpen} onClose={functions.onDepositMVisible}>
                <DepositMetamask modalStyle={modalStyle} functions={functions} />
            </Modal>
            <Modal open={depositCOpen} onClose={functions.onDepositCVisible}>
                <DepositCoinpayment modalStyle={modalStyle} depositAddress={depositAddress} handleClose={functions.onDepositCVisible} />
            </Modal>
        </SubCard>
    );
};

export default memo(Balances);
