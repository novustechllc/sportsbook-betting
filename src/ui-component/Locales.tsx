import React, { useState, useEffect } from 'react';

import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from 'hooks/useConfig';
import Axios from 'utils/axios';
import Loader from './Loader';

interface LocalsProps {
    children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
    const { locale } = useConfig();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

    useEffect(() => {
        setLoading(true);
        Axios.post('api/v1/languages/word/', { id: locale || 'es' })
            .then(({ data }) => {
                setMessages(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [locale]);

    if (loading) return <Loader />;
    return (
        <>
            {messages && (
                <IntlProvider locale={locale} defaultLocale="en" messages={messages} onError={() => {}}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
