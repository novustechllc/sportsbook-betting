import { ReactNode } from 'react';

import { Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import { GenericCardProps } from 'types';

import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

export interface NavGroupProps {
    item: {
        id?: string;
        type?: string;
        icon?: GenericCardProps['iconPrimary'];
        children?: NavGroupProps['item'][];
        title?: ReactNode | string;
        caption?: ReactNode | string;
        color?: 'primary' | 'secondary' | 'default' | undefined;
    };
}

const NavGroup = ({ item }: NavGroupProps) => {
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        <FormattedMessage id="Menu Items Error" />
                    </Typography>
                );
        }
    });

    return <>{items}</>;
};

export default NavGroup;
