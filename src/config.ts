import { ConfigProps } from 'types/config';

export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:2020';
export const BASE_PATH = '';
export const HOME_PATH = '/sports';

const config: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset',
    outlinedFilled: true,
    navType: 'dark',
    presetColor: 'default',
    dark1: '#191919',
    dark2: '#272727',
    dark3: '#1c1c1c',
    grey2: '#8c8c8c',
    locale: 'en',
    rtlLayout: false,
    timer1: 5000,
    timer2: 900000,
    RECAPTCHA_SITE_KEY: '6LeRhsIeAAAAADY6KUkpQaIqPTKsXy2sa7u4JBAb',
    adminSolanaWallet: '8Myhky6nWVJFeNkcBH3FE9i29KqV4qsD8reook3AUqYk',
    adminMetamaskWallet: '0x9FbCF8e7a61c734869FC3d00e17c4c616EDBbd98'
};

export default config;
