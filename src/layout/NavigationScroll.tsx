import { useEffect, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationScroll = ({ children }: { children: ReactElement | null }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

export default NavigationScroll;
