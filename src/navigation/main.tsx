import { FormattedMessage } from 'react-intl';
import { SidebarItem } from 'ui-component';
import { CasinoIcon, InplayIcon, SportsIcon, UpcomingIcon } from 'ui-component/SvgIcon';

interface DashboardMenuProps {
    id: string;
    title: React.ReactNode | string;
    type: string;
    children: {
        id: string;
        title: React.ReactNode | string;
        type: string;
        url: string;
        icon: React.ReactNode;
        breadcrumbs: boolean;
    }[];
}

const dashboard: DashboardMenuProps = {
    id: 'main',
    title: 'main',
    type: 'group',
    children: [
        {
            id: 'sports',
            title: <FormattedMessage id="Sports" />,
            type: 'item',
            url: '/sports',
            icon: (
                <SidebarItem index={0}>
                    <SportsIcon />
                </SidebarItem>
            ),
            breadcrumbs: false
        },
        {
            id: 'inplay',
            title: <FormattedMessage id="Inplay" />,
            type: 'item',
            url: '/inplay',
            icon: (
                <SidebarItem index={1}>
                    <InplayIcon />
                </SidebarItem>
            ),
            breadcrumbs: false
        },
        {
            id: 'upcoming',
            title: <FormattedMessage id="Upcoming" />,
            type: 'item',
            url: '/upcoming',
            icon: (
                <SidebarItem index={2}>
                    <UpcomingIcon />
                </SidebarItem>
            ),
            breadcrumbs: false
        }
        // {
        //     id: 'casino',
        //     title: <FormattedMessage id="Casino" />,
        //     type: 'item',
        //     url: '/casino',
        //     icon: (
        //         <SidebarItem index={3}>
        //             <CasinoIcon />
        //         </SidebarItem>
        //     ),
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
