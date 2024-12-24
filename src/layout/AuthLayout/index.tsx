import { useSelector } from 'store';

import Login from 'views/auth/Login';
import Register from 'views/auth/Register';
import Forgot from 'views/auth/ForgotPassword';
import ResetPassword from 'views/auth/ResetPassword';
import Bets from 'views/mybets/bets';

const AuthLayout = () => {
    const { page } = useSelector((state) => state.menu);
    return (
        <>
            {page === 'login' && <Login />}
            {page === 'register' && <Register />}
            {page === 'forgot' && <Forgot />}
            {page === 'reset-password' && <ResetPassword />}
            {page === 'bets' && <Bets />}
        </>
    );
};

export default AuthLayout;
