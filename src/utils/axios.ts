import axios from 'axios';
import { BASE_URL } from 'config';
import { store } from 'store';
import { Logout } from 'store/reducers/auth';
import snackbar from './snackbar';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
    (config: any) => {
        config.baseURL = BASE_URL;
        const state = store.getState() as any;
        const accessToken = state.auth.token;
        if (accessToken) {
            config.headers.authorization = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response && response.status === 400) {
            snackbar(response.data, 'error');
        } else if (response && response.status === 401) {
            store.dispatch(Logout({}));
        } else if (response && response.status === 413) {
            snackbar(response.data, 'error');
        } else if (response && response.status === 429) {
            snackbar(response.data, 'error');
        } else {
            console.log(response);
        }
        return Promise.reject(error);
    }
);

export default axiosServices;
