import { Outlet } from 'react-router-dom';

import { CardContent, Grid, useTheme } from '@mui/material';

import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import NavItem from './NavItem';

const UserLayout = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={3}>
                <MainCard style={{ padding: 0 }} content={false}>
                    <NavItem />
                </MainCard>
            </Grid>
            <Grid item xs={12} lg={9}>
                <MainCard content={false}>
                    <CardContent
                        sx={{
                            borderLeft: '1px solid',
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                            height: '100%'
                        }}
                    >
                        <Outlet />
                    </CardContent>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UserLayout;
