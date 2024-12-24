import { CurrencyProps } from './payment';

export type UserProfile = {
    _id: string;
    email: string;
    username: string;
    avatar: string;
    iReferral: string;
    cryptoAccount?: string;
    publicAddress?: string;
    oddsformat?: string;
    rReferral?: string;
    pReferral?: string;
};

export type APIContextType = {
    login: (email: string, password: string, recaptcha: string | null) => Promise<any>;
    register: (email: string, username: string, password: string, recaptcha: string) => Promise<any>;
    logout: () => void;
    checkAddress: (publicAddress: string) => Promise<any>;
    signInAddress: (publicAddress: string, signature: string) => Promise<any>;
    signInSolana: (publicAddress: string, signature: string) => Promise<any>;
    signUpAddress: (publicAddress: string) => Promise<any>;
    forgotPassword: (email: string, recaptcha: string) => Promise<any>;
    changePassword: (data: any) => Promise<any>;
    resetPassword: (email: string) => void;
    updateUserInfo: (user: any) => Promise<any>;
    getReferral: () => Promise<any>;
    getTransactions: () => Promise<any>;
    getBalances: () => Promise<any>;
    uploadFile: (data: FormData) => Promise<any>;
    deleteFile: (uri: string) => Promise<any>;
    getCurrency: () => Promise<any>;
    addCurrency: (currency: string) => Promise<any>;
    changeCurrency: (currency: string) => Promise<any>;
    deposit: () => Promise<any>;
    depositSolana: (transaction: any) => Promise<any>;
    depositMetamask: (transaction: any) => Promise<any>;
    withdrawal: (address: string, method: number, amount: number) => Promise<any>;
    cancelWithdrawal: (_id: string) => Promise<any>;
    betSport: (data: any, type: string, stake: number) => Promise<any>;
    getMybets: (status: string) => Promise<any>;
    getCasinoHistory: (type: number, perPage: number) => Promise<any>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    token?: string | undefined;
    user: UserProfile;
    balance: number;
    betsId: string;
    balanceId: string;
    currencyId: string;
    code: string;
    currency: CurrencyProps;
}
