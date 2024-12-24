import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { FormattedMessage } from 'react-intl';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import useApi from 'hooks/useApi';
import { CoinbaseWallet, injected, switchNetwork, WalletConnect } from 'utils/connectors';

import { useDispatch, useSelector } from 'store';
import { UpdateInfo } from 'store/reducers/auth';

import Wallet from 'assets/images/icons/wallet.svg';
import Metamask from 'assets/images/icons/metamask.svg';
import Coinbase from 'assets/images/icons/coinbase.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ConnectWallet = () => {
    const Api = useApi();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { account, activate, active } = useWeb3React();
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async (params: any) => {
        if (!active) {
            // await switchNetwork('ethereum', true);
            setLoading(true);
            activate(params, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(params);
                }
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        if (active) {
            setLoading(false);
            if (account !== user?.cryptoAccount) {
                Api.updateUserInfo({ cryptoAccount: account, update: false }).then(({ data }) => {
                    dispatch(UpdateInfo(data));
                });
            }
        }
        // eslint-disable-next-line
    }, [active]);

    useEffect(() => {
        if (user?.cryptoAccount) handleClick(injected);
        // eslint-disable-next-line
    }, [user]);

    return (
        <Stack spacing={1}>
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                        <Stack direction="row">
                            <Box sx={{ position: 'relative', width: '30px', height: '30px', mr: 1 }}>
                                {loading && <CircularProgress size={30} />}
                                <img
                                    src={Metamask}
                                    alt="metamask"
                                    width={20}
                                    height={20}
                                    style={{
                                        position: 'absolute',
                                        transform: 'translate(-50%, -50%)',
                                        top: '50%',
                                        left: '50%'
                                    }}
                                />
                            </Box>
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {active ? <FormattedMessage id="Connected to" /> : <FormattedMessage id="Metakmask" />}
                            </Typography>
                        </Stack>
                        {account ? (
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {account.slice(0, 6)}...{account.slice(38, 42)}
                            </Typography>
                        ) : (
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h5">
                                    <FormattedMessage id="Link account" />
                                </Typography>
                                <AddIcon />
                            </Stack>
                        )}
                    </Stack>
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                        <Stack direction="row">
                            <Box sx={{ position: 'relative', width: '30px', height: '30px', mr: 1 }}>
                                {loading && <CircularProgress size={30} />}
                                <img
                                    src={Coinbase}
                                    alt="Coinbase"
                                    width={20}
                                    height={20}
                                    style={{
                                        position: 'absolute',
                                        transform: 'translate(-50%, -50%)',
                                        top: '50%',
                                        left: '50%'
                                    }}
                                />
                            </Box>
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {active ? <FormattedMessage id="Connected to" /> : <FormattedMessage id="Coinbase" />}
                            </Typography>
                        </Stack>
                        {account ? (
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {account.slice(0, 6)}...{account.slice(38, 42)}
                            </Typography>
                        ) : (
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h5">
                                    <FormattedMessage id="Link account" />
                                </Typography>
                                <AddIcon />
                            </Stack>
                        )}
                    </Stack>
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                        <Stack direction="row">
                            <Box sx={{ position: 'relative', width: '30px', height: '30px', mr: 1 }}>
                                {loading && <CircularProgress size={30} />}
                                <img
                                    src={Wallet}
                                    alt="Wallet"
                                    width={20}
                                    height={20}
                                    style={{
                                        position: 'absolute',
                                        transform: 'translate(-50%, -50%)',
                                        top: '50%',
                                        left: '50%'
                                    }}
                                />
                            </Box>
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {active ? <FormattedMessage id="Connected to" /> : <FormattedMessage id="Wallet Connect" />}
                            </Typography>
                        </Stack>
                        {account ? (
                            <Typography variant="h5" sx={{ lineHeight: 2.3 }}>
                                {account.slice(0, 6)}...{account.slice(38, 42)}
                            </Typography>
                        ) : (
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h5">
                                    <FormattedMessage id="Link account" />
                                </Typography>
                                <AddIcon />
                            </Stack>
                        )}
                    </Stack>
                </Button>
            </AnimateButton>
        </Stack>
    );
};

export default ConnectWallet;
