import { MenuProps } from 'types/menu';
import { createSlice } from '@reduxjs/toolkit';

const initialState: MenuProps = {
    selectedItem: ['dashboard'],
    drawerOpen: false,
    page: ''
};

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        },

        ChangePage(state, action: any) {
            state.page = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, ChangePage } = menu.actions;
