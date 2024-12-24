import { ForwardRefExoticComponent, RefAttributes, forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Avatar, Chip, ListItemButton, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { LinkTarget, NavItemType } from 'types';

import { useDispatch, useSelector } from 'store';
import { activeItem, openDrawer } from 'store/reducers/menu';

interface NavItemProps {
    item: NavItemType;
    level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const dispatch = useDispatch();
    const { drawerOpen, selectedItem } = useSelector((state) => state.menu);

    const itemIcon = item?.icon ? (
        item?.icon
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget: LinkTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps: {
        component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
        href?: string;
        target?: LinkTarget;
    } = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url!} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id: string) => {
        dispatch(activeItem([id]));
        matchesSM && dispatch(openDrawer(false));
    };

    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem([item.id!]));
        }
        // eslint-disable-next-line
    }, [pathname]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: drawerOpen ? '10px' : '20px',
                alignItems: 'flex-start',
                justifyContent: drawerOpen ? 'flex-start' : 'center',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                px: level > 1 ? 1.25 : 1.5,
                my: 1,
                '& h3': {
                    fontWeight: 700,
                    color: '#6D7289'
                },
                '&.Mui-selected h3': {
                    color: '#fff'
                }
            }}
            selected={selectedItem?.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id!)}
        >
            <>
                {itemIcon}
                <ListItemText
                    sx={{
                        m: 'auto',
                        ml: '16px',
                        minWidth: '150px',
                        transition: theme.transitions.create('all'),
                        display: drawerOpen ? 'block' : 'none',
                        color: drawerOpen ? '#fff' : '#6D7289'
                    }}
                    primary={
                        <Typography color="inherit" variant="h3">
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography color="inherit" variant="h3">
                                {item.caption}
                            </Typography>
                        )
                    }
                />
                {item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </>
        </ListItemButton>
    );
};

export default NavItem;
