import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import MyBetsRoutes from './MyBetsRoutes';
// import CasinoRoutes from './CasinoRoutes';
import ProfileRoutes from './ProfileRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Error from 'views/pages/Error';

export default function ThemeRoutes() {
    return useRoutes([
        MainRoutes,
        // CasinoRoutes,
        ProfileRoutes,
        MyBetsRoutes,
        AuthenticationRoutes,
        { path: '*', element: <Error /> }
    ]);
}
