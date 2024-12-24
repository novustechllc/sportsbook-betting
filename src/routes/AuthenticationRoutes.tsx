import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const PagesTerms = Loadable(lazy(() => import('views/pages/Terms')));
const PagesContactUS = Loadable(lazy(() => import('views/pages/contact-us')));
const PagesPrivacyPolicy = Loadable(lazy(() => import('views/pages/PrivacyPolicy')));

const AuthenticationRoutes = {
    path: '/pages',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/terms',
            element: <PagesTerms />
        },
        {
            path: '/pages/contact-us',
            element: <PagesContactUS />
        },
        {
            path: '/pages/privacy-policy',
            element: <PagesPrivacyPolicy />
        }
    ]
};

export default AuthenticationRoutes;
