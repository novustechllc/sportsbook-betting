import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CasinoLayout from 'layout/CasinoLayout';

const CasinoPage = Loadable(lazy(() => import('views/casino')));
// const BlackjackPage = Loadable(lazy(() => import('views/casino/Blackjack')));
// const CoinflipPage = Loadable(lazy(() => import('views/casino/Coinflip')));
// const DiamondsPage = Loadable(lazy(() => import('views/casino/Diamonds')));
// const DicePage = Loadable(lazy(() => import('views/casino/Dice')));
// const PlinkoPage = Loadable(lazy(() => import('views/casino/Plinko')));
// const LimboPage = Loadable(lazy(() => import('views/casino/Limbo')));
// const KenoPage = Loadable(lazy(() => import('views/casino/Keno')));
// const WheelPage = Loadable(lazy(() => import('views/casino/Wheel')));
// const RoulettePage = Loadable(lazy(() => import('views/casino/Roulette')));

const CasinoRoutes = {
    path: '/casino',
    element: (
        <MainLayout>
            <CasinoLayout />
        </MainLayout>
    ),
    children: [
        {
            path: '/casino',
            element: <CasinoPage />
        }
        // {
        //     path: '/casino/blackjack',
        //     element: <BlackjackPage />
        // },
        // {
        //     path: '/casino/coinflip',
        //     element: <CoinflipPage />
        // },
        // {
        //     path: '/casino/diamonds',
        //     element: <DiamondsPage />
        // },
        // {
        //     path: '/casino/dice',
        //     element: <DicePage />
        // },
        // {
        //     path: '/casino/plinko',
        //     element: <PlinkoPage />
        // },
        // {
        //     path: '/casino/limbo',
        //     element: <LimboPage />
        // },
        // {
        //     path: '/casino/keno',
        //     element: <KenoPage />
        // },
        // {
        //     path: '/casino/wheel',
        //     element: <WheelPage />
        // },
        // {
        //     path: '/casino/roulette',
        //     element: <RoulettePage />
        // }
    ]
};

export default CasinoRoutes;
