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

import Web3 from 'web3';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import useApi from 'hooks/useApi';

import snackbar from 'utils/snackbar';
import { toNumberTag } from 'utils/number';
import { injected, switchNetwork } from 'utils/connectors';

import { useDispatch, useSelector } from 'store';
import { UpdateInfo } from 'store/reducers/auth';

import erc20ABI from 'assets/abi/erc20.abi.json';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Metamask from 'assets/images/icons/metamask.svg';
import config from 'config';

const basic = 'basic';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    functions: any;
}

const DepositMetamask = forwardRef(({ modalStyle, functions }: Props, ref: React.Ref<HTMLDivElement>) => {
    const Api = useApi();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { user, currency }: any = useSelector((state) => state.auth);
    const { account, activate, active, library, chainId } = useWeb3React();
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | string>('');

    const handleClick = async () => {
        await switchNetwork(currency.network);
        if (!active) {
            activate(injected, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(injected);
                }
            });
        }
    };

    const depositMetamask = (signature: string, amounti: BigNumber) => {
        Api.depositMetamask({
            amounti: amounti.toString(),
            from: account,
            address: currency.tokenMintAccount,
            signature,
        })
            .then(({ data }) => {
                snackbar(formatMessage({ id: 'Success! Please wait for a minute.' }), 'success');
                setLoading(false);
                functions.onDepositMVisible();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDepositMetamask = async () => {
        if (!account) {
            snackbar(formatMessage({ id: 'Please connect metamask.' }), 'error');
        } else if (amount === '' || Number(amount) === 0) {
            snackbar(formatMessage({ id: 'Please input correct amount.' }), 'error');
        } else {
            const web3 = new Web3(library.provider);
            let ABI: any;
            if (currency.tokenMintAccount === basic) {
                const decimals = 18;
                if (balance < Number(amount)) {
                    snackbar(formatMessage({ id: 'Balances not enough.' }), 'error');
                } else {
                    setLoading(true);
                    const amounti = parseUnits(amount.toString(), decimals) as BigNumber;
                    web3.eth.sendTransaction(
                        { from: account, to: config.adminMetamaskWallet, value: amounti.toString() },
                        (error, txn_id) => {
                            if (error) {
                                setLoading(false);
                            } else {
                                depositMetamask(txn_id, amounti);
                            }
                        }
                    );
                }
            } else {
                ABI = erc20ABI;
                const contract = new web3.eth.Contract(ABI, currency.tokenMintAccount);
                if (balance < Number(amount)) {
                    snackbar(formatMessage({ id: 'Balances not enough.' }), 'error');
                } else {
                    setLoading(true);
                    const decimals = await contract.methods.decimals().call();
                    const amounti = parseUnits(amount.toString(), decimals);
                    const gasLimit = await contract.methods.transfer(config.adminMetamaskWallet, amounti).estimateGas({ from: account });
                    const gasPrice = await web3.eth.getGasPrice();
                    contract.methods
                        .transfer(config.adminMetamaskWallet, amounti)
                        .send({ from: account, gasLimit, gasPrice }, (error: any, txn_id: string) => {
                            if (error) {
                                setLoading(false);
                            } else {
                                depositMetamask(txn_id, amounti);
                            }
                        });
                }
            }
        }
    };

    const getBalance = async () => {
        if (account !== user?.cryptoAccount) {
            Api.updateUserInfo({ cryptoAccount: account, update: false }).then(({ data }) => {
                dispatch(UpdateInfo(data));
            });
        }
        if (account && currency) {
            try {
                const web3 = new Web3(library.provider);
                let ABI: any;
                if (currency.tokenMintAccount === basic) {
                    const balances = await web3.eth.getBalance(account);
                    const amounti = formatUnits(balances, 18);
                    setBalance(Number(amounti));
                } else {
                    ABI = erc20ABI;
                    const contract = new web3.eth.Contract(ABI, currency.tokenMintAccount);
                    const balances = await contract.methods.balanceOf(account).call();
                    const decimals = await contract.methods.decimals().call();
                    const amounti = formatUnits(balances, decimals);
                    setBalance(Number(amounti));
                }
            } catch (error) {
                // window.location.reload();
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (active) {
            getBalance();
        }
        // eslint-disable-next-line
    }, [active, currency, chainId]);

    useEffect(() => {
        if (user?.cryptoAccount) handleClick();
        // eslint-disable-next-line
    }, [user]);

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
                title={`${formatMessage({ id: 'Deposit' })} ${currency.name}`}
                content={false}
                secondary={
                    <IconButton onClick={functions.onDepositMVisible}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{ mb: 2, pt: 0 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setAmount(balance)}
                            >
                                <img src={Metamask} alt="metamask" width={20} height={20} />
                                <Typography className="h6">
                                    {toNumberTag(balance)} {currency.symbol} <FormattedMessage id="Available" />
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                type="number"
                                fullWidth
                                label={formatMessage({ id: 'Deposit amount' })}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Alert variant="outlined" severity="warning" sx={{ borderColor: theme.palette.warning.main }}>
                                <FormattedMessage id="Minimum Deposit" />: {currency.minDeposit} {currency.symbol}
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    disabled={loading || amount === '' || Number(amount) === 0}
                                    disableElevation
                                    fullWidth
                                    onClick={onDepositMetamask}
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        color: 'grey.700',
                                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                    }}
                                >
                                    {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                    <FormattedMessage id="Deposit" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </div>
    );
});

export default DepositMetamask;
