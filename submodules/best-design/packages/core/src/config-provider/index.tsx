import { createContext, useContext } from 'react';

export interface ConfigConsumerProps {
    prefix?: string;
    components?: Record<string, any>;
    defaultConfig?: {
        size: 'medium' | 'mini' | 'small' | 'large';
    };
    // locale: Locale
}
export const ConfigContext = createContext<ConfigConsumerProps>({
    prefix: 'best',
    defaultConfig: {
        size: 'medium'
    }
});
export interface ConfigProviderProps {
    consumerProps?: ConfigConsumerProps;
    extendConfig?: boolean;
}
export function ConfigProvider(props: React.PropsWithChildren<ConfigProviderProps>) {
    const baseConsumerProps = useContext(ConfigContext);
    const { children, consumerProps, extendConfig } = props;
    const mergedProps: ConfigConsumerProps = {
        ...(extendConfig ? baseConsumerProps : {}),
        ...consumerProps
    };
    return <ConfigContext.Provider value={mergedProps}>{children}</ConfigContext.Provider>;
}
export function useConfigContext() {
    return useContext(ConfigContext);
}
