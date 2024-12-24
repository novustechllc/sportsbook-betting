import { Suspense, LazyExoticComponent, ComponentType } from 'react';

import { LinearProgressProps } from '@mui/material';

import Loader from './Loader';

interface LoaderProps extends LinearProgressProps {}

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode> | any) => (props: LoaderProps) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
