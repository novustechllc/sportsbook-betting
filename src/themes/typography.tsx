import { Theme, TypographyVariantsOptions } from '@mui/material';

const Typography = (theme: Theme, borderRadius: number, fontFamily: string): TypographyVariantsOptions => ({
    fontFamily,
    h6: {
        fontWeight: 500,
        color: theme.palette.grey[600],
        fontSize: '0.75rem'
    },
    h5: {
        fontSize: '0.875rem',
        color: theme.palette.grey[600],
        fontWeight: 500
    },
    h4: {
        fontSize: '1rem',
        color: theme.palette.grey[600],
        fontWeight: 600
    },
    h3: {
        fontSize: '1.1rem',
        color: theme.palette.grey[600],
        fontWeight: 500
    },
    h2: {
        fontSize: '1.5rem',
        color: theme.palette.grey[600],
        fontWeight: 700
    },
    h1: {
        fontSize: '2.125rem',
        color: theme.palette.grey[600],
        fontWeight: 700
    },
    subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.dark
    },
    subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: theme.palette.text.secondary
    },
    caption: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        fontWeight: 400
    },
    body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.334em'
    },
    body2: {
        letterSpacing: '0em',
        fontWeight: 400,
        lineHeight: '1.5em',
        color: theme.palette.text.primary
    },
    button: {
        textTransform: 'capitalize'
    },
    customInput: {
        marginTop: 1,
        marginBottom: 1,
        '& > label': {
            top: 13,
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: 0
            }
        },
        '& > div > input': {
            padding: '20.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    },
    mainContent: {
        transition: theme.transitions.create('all'),
        backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.primary.light,
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        flexGrow: 1,
        padding: '0px',
        paddingTop: '10px',
        marginTop: '80px'
    },
    menuCaption: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.grey[600],
        padding: '6px',
        textTransform: 'capitalize',
        marginTop: '10px'
    },
    subMenuCaption: {
        fontSize: '0.6875rem',
        fontWeight: 500,
        color: theme.palette.text.secondary,
        textTransform: 'capitalize'
    },
    commonAvatar: {
        cursor: 'pointer',
        borderRadius: '8px'
    },
    smallAvatar: {
        width: '22px',
        height: '22px',
        fontSize: '1rem'
    },
    mediumAvatar: {
        width: '34px',
        height: '34px',
        fontSize: '1.2rem'
    },
    largeAvatar: {
        width: '44px',
        height: '44px',
        fontSize: '1.5rem'
    }
});

export default Typography;
