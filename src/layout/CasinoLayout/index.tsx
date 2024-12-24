import { Outlet } from 'react-router-dom';
import History from 'views/casino/History';

const CasinoLayout = () => (
    <>
        <Outlet />
        <History />
    </>
);

export default CasinoLayout;
