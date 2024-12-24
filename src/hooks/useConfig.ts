import { useContext } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
