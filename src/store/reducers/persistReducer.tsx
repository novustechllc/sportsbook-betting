import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'boi-book-v1',
    storage,
    whitelist: ['auth']
};

const persist = (reducers: any) => persistReducer(persistConfig, reducers);

export default persist;
