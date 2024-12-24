import { createContext, ReactNode } from 'react';

import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

import { CustomizationProps } from 'types/config';

const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeLocale: () => {}
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
    const [config, setConfig] = useLocalStorage('berry-config', {
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        boxShadow: initialState.boxShadow,
        presetColor: initialState.presetColor,
        locale: initialState.locale,
        rtlLayout: initialState.rtlLayout
    });

    const onChangeLocale = (locale: string) => {
        setConfig({
            ...config,
            locale
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLocale
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

export { ConfigProvider, ConfigContext };
