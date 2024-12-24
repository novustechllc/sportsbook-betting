import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Web3ReactProvider } from '@web3-react/core';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';

import App from 'App';
import { BASE_PATH } from 'config';
import { store, persister } from 'store';
import getLibrary from 'utils/getlibrary';
import { ConfigProvider } from 'contexts/ConfigContext';

import 'assets/scss/style.scss';

import 'moment/locale/ja';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/tr';
import 'moment/locale/th';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/vi';
import 'moment/locale/zh-cn';

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <ConfigProvider>
                    <BrowserRouter basename={BASE_PATH}>
                        <App />
                    </BrowserRouter>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </Web3ReactProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
reportWebVitals();
