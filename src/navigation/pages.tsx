import { FormattedMessage } from 'react-intl';

import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconQuestionMark, IconShieldLock } from '@tabler/icons';

const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconQuestionMark,
    IconShieldLock
};

const pages = {
    id: 'pages',
    title: 'pages',
    type: 'group',
    children: [
        {
            id: 'contact-us',
            title: <FormattedMessage id="Contact us" />,
            type: 'item',
            icon: icons.IconPhoneCall,
            url: '/pages/contact-us',
            target: true
        },
        {
            id: 'terms',
            title: <FormattedMessage id="Terms" />,
            type: 'item',
            icon: icons.IconQuestionMark,
            url: '/pages/terms',
            target: true
        },
        {
            id: 'faqs',
            title: <FormattedMessage id="Faqs" />,
            type: 'item',
            icon: icons.IconQuestionMark,
            url: '/pages/faqs',
            target: true
        },
        {
            id: 'privacy-policy',
            title: <FormattedMessage id="Privacy Policy" />,
            type: 'item',
            icon: icons.IconShieldLock,
            url: '/pages/privacy-policy',
            target: true
        }
    ]
};

export default pages;
