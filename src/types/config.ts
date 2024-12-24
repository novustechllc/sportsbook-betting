import { PaletteMode } from '@mui/material';

export type ConfigProps = {
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    grey2: string;
    dark1: string;
    dark2: string;
    dark3: string;
    boxShadow: string;
    locale: string;
    rtlLayout: boolean;
    timer1: number;
    timer2: number;
    RECAPTCHA_SITE_KEY: string;
    adminSolanaWallet: string;
    adminMetamaskWallet: string;
};

export type CustomizationProps = {
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    boxShadow: string;
    locale: string;
    rtlLayout: boolean;
    onChangeLocale: (locale: string) => void;
};

export enum ModeTypes {
    pro = 'pro',
    _dev = '_dev',
    dev = 'dev'
}
