import { createSlice } from '@reduxjs/toolkit';
import { SportsProps } from 'types/sports';

const initialState: SportsProps = {
    betslipData: [],
    liveMatches: [],
    recentBets: [],
    betAmount: 0,
    betslipOpen: false,
    search: ''
};

const sports = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        setBetslip(state, action) {
            const innerWidth = window.innerWidth;
            if (innerWidth > 767 && action.payload.length > state.betslipData.length) {
                state.betslipOpen = true;
            }
            state.betslipData = [...action.payload];
        },

        clearAll(state) {
            state.betslipData = [];
        },

        setLiveMatches(state, action) {
            state.liveMatches = action.payload;
        },

        setRecentBets(state, action) {
            state.recentBets = action.payload;
        },

        setBetAmount(state, action) {
            state.betAmount = action.payload;
        },

        openBetslip(state, action) {
            state.betslipOpen = action.payload;
        },

        updateSearch(state, action) {
            state.search = action.payload;
        }
    }
});

export default sports.reducer;

export const { setBetslip, setRecentBets, setLiveMatches, setBetAmount, clearAll, openBetslip, updateSearch } = sports.actions;
