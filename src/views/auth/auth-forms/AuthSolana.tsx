import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

import bs58 from 'bs58';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { useDispatch, useSelector } from 'store';

import { Login } from 'store/reducers/auth';
import { ChangePage } from 'store/reducers/menu';

import useApi from 'hooks/useApi';
import snackbar from 'utils/snackbar';

import PhantomLogo from 'assets/images/icons/phantom-logo.png';
import { Box, CircularProgress } from '@mui/material';

const AuthSolana = ({ loading, setLoading }: any) => {
    const dispatch = useDispatch();
    const [publicKeyAsString, setPublicKeyAsString] = useState('');
    const { code, isLoggedIn, isInitialized } = useSelector((state) => state.auth);
    const { logout, signInSolana, checkAddress, signUpAddress } = useApi();

    const { publicKey, connected } = useWallet();

    const onLogin = (userInfo: any) => {
        dispatch(Login(userInfo));
        dispatch(ChangePage(''));
        snackbar(
            <>
                You have successfully logged in as a user to {process.env.REACT_APP_SIGNIN_MESSAGE}.
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

    const handleAuthenticate = (publicAddress: PublicKey, signature: []) => {
        signInSolana(publicAddress.toBase58(), bs58.encode(signature))
            .then(({ data }: any) => {
                setLoading(false);
                onLogin(data);
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };

    const handleSignMessage = async ({ nonce }: any) => {
        try {
            const win: any = window;
            const provider = win.solana;
            const encodedMessage = new TextEncoder().encode(`${process.env.REACT_APP_SIGNIN_MESSAGE}: ${nonce}`);
            const signRequestResult = await provider.signMessage(encodedMessage, 'utf8');
            const pubKey = signRequestResult.publicKey;
            const signature = signRequestResult.signature;
            handleAuthenticate(pubKey, signature);
        } catch (error) {
            setLoading(false);
        }
    };

    const solanaLogin = async () => {
        let pubString = '';
        if (publicKeyAsString) {
            pubString = publicKeyAsString || '';
        } else if (connected) {
            pubString = publicKey?.toString() || '';
        }
        if (pubString) {
            setLoading(true);
            checkAddress(pubString as string)
                .then(({ data }: any) => {
                    if (data.status) {
                        handleSignMessage(data.user);
                    } else {
                        solanaRegister();
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const solanaRegister = () => {
        if (publicKeyAsString) {
            signUpAddress(publicKeyAsString as string)
                .then(({ data }: any) => {
                    snackbar(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const Logout = () => {
        logout();
        localStorage.clear();
        if (window) {
            // @ts-ignore
            window?.location.reload();
        }
    };

    useEffect(() => {
        if (publicKeyAsString) {
            if (publicKey?.toString() !== publicKeyAsString) {
                Logout();
            }
        }
        if (publicKey && !isLoggedIn) {
            setPublicKeyAsString(publicKey.toString());
        }
        // eslint-disable-next-line
    }, [publicKey]);

    useEffect(() => {
        if (!isLoggedIn && connected && publicKeyAsString) {
            solanaLogin();
        }
        // eslint-disable-next-line
    }, [isLoggedIn, connected, publicKeyAsString]);

    useEffect(() => {
        if (code && code !== '' && !isInitialized) {
            snackbar(<>Please Select Wallet and Sign Up before expire the referral info.</>);
        }
        // eslint-disable-next-line
    }, [code]);

    return (
        <WalletModalProvider>
            {loading ? (
                <Box sx={{ position: 'relative', width: '36px', height: '36px' }}>
                    <CircularProgress size={36} />
                    <img
                        src={PhantomLogo}
                        alt="coinbase"
                        width={26}
                        height={26}
                        style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%'
                        }}
                    />
                </Box>
            ) : (
                <>
                    {publicKeyAsString || connected ? (
                        <LoadingButton loading={loading} sx={{ color: 'white' }} variant="outlined" onClick={() => solanaLogin()}>
                            <img src={PhantomLogo} alt="" style={{ width: '26px', height: '26px' }} />
                        </LoadingButton>
                    ) : (
                        <WalletMultiButton>
                            <img src={PhantomLogo} alt="" style={{ width: '26px', height: '26px' }} />
                        </WalletMultiButton>
                    )}
                </>
            )}
        </WalletModalProvider>
    );
};
export default AuthSolana;
