import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Routes from 'routes';
import io from 'socket.io-client';

import { BASE_URL } from 'config';
import ThemeCustomization from 'themes';
import { APIProvider } from 'contexts/ApiContext';

import { useDispatch, useSelector } from 'store';
import { ChangePage } from 'store/reducers/menu';
import { Logout, SetBetsId, SetCode, UpdateBalance } from 'store/reducers/auth';
import { setRecentBets, setLiveMatches } from 'store/reducers/sports';

import Locales from 'ui-component/Locales';
import Snackbar from 'ui-component/extended/Snackbar';
import NavigationScroll from 'layout/NavigationScroll';
import getLibrary from 'utils/getlibrary';

import { Web3ReactProvider } from '@web3-react/core';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Axios from 'utils/axios';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { isLoggedIn, balance, token } = useSelector((state) => state.auth);

    let network: any;

    // if (BASE_URL?.indexOf('localhost') !== -1 || BASE_URL?.indexOf('test') !== -1) {
    //     network = WalletAdapterNetwork.Testnet;
    // } else {
        network = WalletAdapterNetwork.Mainnet;
    // }

    // You can also provide a custom RPC endpoint
    // const endpoint = 'https://blue-delicate-wildflower.solana-mainnet.quiknode.pro/2f054b4c3a7d3f8841b584875204e3aa7c42d8ab/';
    // const endpoint = clusterApiUrl(network);
    // let endpoint = 'https://solana-api.projectserum.com';
    let endpoint = 'https://hidden-wandering-aura.solana-mainnet.quiknode.pro/e0a0b8715ea82e2abccff89f6ceed40bd68f9875/';
    // let endpoint = 'https://ethereum.publicnode.com';
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network })
        ],
        [network]
    );

    const getRecentHistories = () => {
        Axios.post('api/v2/sports/recents-history').then(({ data }) => {
            dispatch(setRecentBets(data));
        });
    };

    useEffect(() => {
        let socket = io(BASE_URL);
        if (isLoggedIn) {
            socket = io(BASE_URL, { query: { auth: token } });
            socket.on('logout', () => {
                dispatch(Logout({}));
            });
            socket.on('reload', () => {
                window.location.reload();
            });
            socket.on('balance', (data) => {
                if (!isLoggedIn) return;
                if (data.balance !== balance) {
                    dispatch(UpdateBalance(data.balance));
                }
            });
            socket.on('bet', () => {
                getRecentHistories();
            });
        }
        return () => {
            if (socket) {
                socket.off('logout');
                socket.off('reload');
                socket.off('balance');
                socket.off('bet');
            }
        };
    }, [token, balance, isLoggedIn, dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const c = params.get('c');
        if (c) {
            dispatch(SetCode(c));
            // dispatch(ChangePage('register'));
        }
        const b = params.get('b');
        if (b) {
            dispatch(SetBetsId(b));
            dispatch(ChangePage('bets'));
        }
    }, [pathname, dispatch]);

    useEffect(() => {
        getRecentHistories();
    }, []);

    return (
        <ThemeCustomization>
            <Web3ReactProvider getLibrary={getLibrary}>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets}>
                        <Locales>
                            <NavigationScroll>
                                <APIProvider>
                                    <>
                                        <Routes />
                                        <Snackbar />
                                    </>
                                </APIProvider>
                            </NavigationScroll>
                        </Locales>
                    </WalletProvider>
                </ConnectionProvider>
            </Web3ReactProvider>
        </ThemeCustomization>
    );
};

export default App;
