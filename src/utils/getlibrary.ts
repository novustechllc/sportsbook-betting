import { Web3Provider, JsonRpcFetchFunc } from '@ethersproject/providers';

const getLibrary = (provider: JsonRpcFetchFunc) => {
    const library = new Web3Provider(provider, 'any');
    library.pollingInterval = 15000;
    return library;
};

export default getLibrary;
