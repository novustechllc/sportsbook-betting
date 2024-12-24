import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardProps } from 'types';
import { HOME_PATH } from 'config';
import { useSelector } from 'store';

const AuthGuard = ({ children }: GuardProps) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(HOME_PATH, { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AuthGuard;
