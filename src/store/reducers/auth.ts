import { InitialLoginContextProps } from 'types/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialCurrency = {
    _id: '',
    icon: 'https://boibook.io/SOL.png',
    symbol: 'SOL',
    minBet: 10,
    maxBet: 100000,
    price: 0.1,
    tokenMintAccount: ''
};

const initialUser = {
    _id: '',
    email: '',
    username: '',
    iReferral: '',
    pReferral: '',
    avatar: ''
};

const initialState: InitialLoginContextProps = {
    isInitialized: true,
    isLoggedIn: false,
    code: '',
    betsId: '',
    token: '',
    balance: 0,
    balanceId: '',
    currencyId: '',
    user: initialUser,
    currency: initialCurrency
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action: any) {
            const { balance, user, session } = action.payload!;
            state.user = user;
            state.token = session.accessToken;
            state.balance = balance.balance;
            state.balanceId = balance._id;
            state.currency = balance.currency;
            state.currencyId = balance.currency._id;
            state.isLoggedIn = true;
            state.isInitialized = true;
        },

        UpdateInfo(state, action: any) {
            state.user = action.payload;
        },

        UpdateBalance(state, action: any) {
            state.balance = action.payload;
        },

        UpdateBalances(state, action: any) {
            const balance = action.payload!;
            state.balance = balance.balance;
            state.balanceId = balance._id;
            state.currency = balance.currency;
            state.currencyId = balance.currency._id;
            state = { ...state };
        },

        SetCode(state, action: any) {
            state.code = action.payload;
        },

        SetBetsId(state, action: any) {
            state.betsId = action.payload;
        },

        Logout(state, action: any) {
            state.token = '';
            state.balance = 0;
            state.balanceId = '';
            state.currencyId = '';
            state.user = initialUser;
            state.currency = initialCurrency;
            state.isLoggedIn = false;
            state.isInitialized = true;
            state = { ...state };
            if (
                window.location.pathname.toString().indexOf('blackjack') !== -1 ||
                window.location.pathname.toString().indexOf('roulette') !== -1
            ) {
                window.location.reload();
            }
        }
    }
});

export default auth.reducer;

export const { Login, Logout, UpdateInfo, UpdateBalances, UpdateBalance, SetCode, SetBetsId } = auth.actions;
