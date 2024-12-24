import { memo } from 'react';

import { Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import menuItem from 'navigation';
import NavGroup from './NavGroup';

const MenuList = () => {
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        <FormattedMessage id="Menu Items Error" />
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
