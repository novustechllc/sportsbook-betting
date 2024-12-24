import React, { createContext } from 'react';
import { Logout } from 'store/reducers/auth';
import Loader from 'ui-component/Loader';
import { APIContextType } from 'types/auth';
import { useDispatch, useSelector } from 'store';
import axios from 'utils/axios';

const APIContext = createContext<APIContextType | null>(null);

export const APIProvider = ({ children }: { children: React.ReactElement }) => {
    const dispatch = useDispatch();
    const state = useSelector((store) => store.auth);
    const { user, currencyId, balanceId, code } = state;
    const userId = user?._id;

    const resetPassword = (email: string) => console.log(email);

    const login = async (email: string, password: string, recaptcha: string | null) => {
        const data = await axios.post('api/v2/users/signin', { email, password, recaptcha });
        return data;
    };

    const register = async (email: string, username: string, password: string, recaptcha: string) => {
        const data = await axios.post('api/v2/users/signup', { rReferral: code, email, username, password, recaptcha });
        return data;
    };

    const logout = () => {
        dispatch(Logout({}));
    };

    const forgotPassword = async (email: string, recaptcha: string) => {
        const res = await axios.post('api/v2/users/forgot', { email, recaptcha });
        return res;
    };

    const changePassword = async (data: any) => {
        const res = await axios.post('api/v2/users/c-password', data);
        return res;
    };

    const checkAddress = async (publicAddress: string) => {
        const res = await axios.post('api/v2/users/a-check', { publicAddress });
        return res;
    };

    const signInAddress = async (publicAddress: string, signature: string) => {
        const res = await axios.post('api/v2/users/a-signin', { publicAddress, signature });
        return res;
    };

    const signInSolana = async (publicAddress: string, signature: string) => {
        const res = await axios.post('api/v2/users/s-signin', {
            publicAddress,
            signature
        });
        return res;
    };

    const signUpAddress = async (publicAddress: string) => {
        const params = { publicAddress, rReferral: code };
        const res = await axios.post('api/v2/users/a-signup', params);
        return res;
    };

    const updateUserInfo = async (info: any) => {
        const res = await axios.post('api/v2/users/info', { ...info, userId });
        return res;
    };

    const getReferral = async () => {
        const res = await axios.post('api/v2/users/referral', { userId });
        return res;
    };

    const getTransactions = async () => {
        const res = await axios.post('api/v2/payments/get-transaction', { userId });
        return res;
    };

    const getBalances = async () => {
        const res = await axios.post('api/v2/payments/get-balance', { userId });
        return res;
    };

    const getCurrency = async () => {
        const res = await axios.post('api/v2/payments/get-currency', {});
        return res;
    };

    const addCurrency = async (currency: string) => {
        const res = await axios.post('api/v2/payments/add-currency', { userId, currency });
        return res;
    };

    const changeCurrency = async (currency: string) => {
        const res = await axios.post('api/v2/payments/use-currency', { userId, currency });
        return res;
    };

    const deposit = async () => {
        const res = await axios.post('api/v2/payments/deposit', { userId, currencyId, balanceId });
        return res;
    };

    const depositSolana = async (transaction: any) => {
        const res = await axios.post('api/v2/payments/s-deposit', { userId, balanceId, currencyId, ...transaction });
        return res;
    };

    const depositMetamask = async (transaction: any) => {
        const res = await axios.post('api/v2/payments/m-deposit', { userId, balanceId, currencyId, ...transaction });
        return res;
    };

    const withdrawal = async (address: string, method: number, amount: number) => {
        const res = await axios.post('api/v2/payments/withdrawal', { userId, currencyId, balanceId, address, method, amount });
        return res;
    };

    const cancelWithdrawal = async (_id: string) => {
        const res = await axios.post('api/v2/payments/c-withdrawal', { userId, _id });
        return res;
    };

    const betSport = async (data: any, type: string, stake: number) => {
        const res = await axios.post('api/v2/sports/bet', { data, type, stake, userId, currency: currencyId });
        return res;
    };

    const getMybets = async (status: string) => {
        const res = await axios.post('api/v2/sports/history', { status, userId });
        return res;
    };

    const getCasinoHistory = async (type: number, perPage: number) => {
        const res = await axios.post('api/v2/games/history', { type, perPage, userId });
        return res;
    };

    const uploadFile = async (data: FormData) => {
        const res = await axios.post('api/v2/files/', data);
        return res;
    };

    const deleteFile = async (uri: string) => {
        const res = await axios.post('api/v2/files/delete', { uri });
        return res;
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <APIContext.Provider
            value={{
                login,
                register,
                logout,
                forgotPassword,
                checkAddress,
                signInAddress,
                signInSolana,
                signUpAddress,
                changePassword,
                resetPassword,
                updateUserInfo,
                getReferral,
                getTransactions,
                getBalances,
                getCurrency,
                addCurrency,
                changeCurrency,
                deposit,
                depositSolana,
                depositMetamask,
                withdrawal,
                cancelWithdrawal,
                betSport,
                getMybets,
                getCasinoHistory,
                uploadFile,
                deleteFile
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export default APIContext;
