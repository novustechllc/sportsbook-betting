import { Color, PaletteMode } from '@mui/material';
import { Property } from 'csstype';

export interface CustomizationProps {
    fontFamily: Property.FontFamily;
    borderRadius?: number;
    navType: PaletteMode;
    presetColor?: string;
    rtlLayout?: boolean;
    outlinedFilled?: boolean;
}

export interface CustomShadowProps {
    z1: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    secondary: string;
    orange: string;
    success: string;
    warning: string;
    error: string;
}

export interface CustomTypography {
    customInput?: {
        marginTop: number;
        marginBottom: number;
        '& > label': {
            top: string;
            left: number;
            color?: Color | (Color | undefined)[] | Color[];
            '&[data-shrink="false"]': {
                top: string;
            };
        };
        '& > div > input': {
            padding: string;
        };
        '& legend': {
            display: string;
        };
        '& fieldset': {
            top: number;
        };
    };
    mainContent?: {
        backgroundColor?: string;
        width: string;
        minHeight: string;
        flexGrow: number;
        padding: string;
        marginTop: string;
        marginRight: string;
        borderRadius: string;
    };
    menuCaption?: {
        fontSize: string;
        fontWeight: number;
        color?: Color | (Color | undefined)[] | Color[];
        padding: string;
        textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'inherit';
        marginTop: string;
    };
    subMenuCaption?: {
        fontSize: string;
        fontWeight: number;
        color: Color | (Color | undefined)[] | Color[];
        textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'inherit';
    };
    commonAvatar?: {
        cursor: string;
        borderRadius: string;
    };
    smallAvatar?: {
        width: string;
        height: string;
        fontSize: string;
    };
    mediumAvatar?: {
        width: string;
        height: string;
        fontSize: string;
    };
    largeAvatar?: {
        width: string;
        height: string;
        fontSize: string;
    };
    heading?: string;
    textDark?: string;
    grey900?: string;
    grey800?: string;
    grey700?: string;
    grey600?: string;
    grey500?: string;
    grey400?: string;
    grey300?: string;
    grey200?: string;
    grey100?: string;
    grey50?: string;
    secondaryLight?: string;
    secondary200?: string;
    secondaryDark?: string;
    secondaryMain?: string;
    background?: string;
    darkPrimaryLight?: string;
    darkPrimaryMain?: string;
    darkPrimaryDark?: string;
    darkSecondaryMain?: string;
    darkSecondaryLight?: string;
    darkSecondary800?: string;
    darkSecondary200?: string;
    darkSecondaryDark?: string;
    secondary800?: string;
    darkPrimary800?: string;
    darkPrimary200?: string;
    darkLevel2?: string;
    darkLevel1?: string;
    darkPaper?: string;
    darkTextPrimary?: string;
    darkTextSecondary?: string;
    darkBackground?: string;
    primaryDark?: string;
    primary800?: string;
    primary200?: string;
    primaryLight?: string;
    primaryMain?: string;
    colors?: CustomTypography;
    paper?: string;
    backgroundDefault?: string;
    menuSelected?: string;
    menuSelectedBack?: string;
    divider?: string;
    customization?: CustomizationProps;
    z1?: string;
    z8?: string;
    z12?: string;
    z16?: string;
    z20?: string;
    z24?: string;
    primary?: string;
    secondary?: string;
    orange?: string;
    orangeLight?: string;
    orangeMain?: string;
    orangeDark?: string;
    successLight?: string;
    success200?: string;
    successMain?: string;
    successDark?: string;
    success?: string;
    warning?: string;
    error?: string;
    errorLight?: string;
    errorMain?: string;
    errorDark?: string;
    warningLight?: string;
    warningMain?: string;
    warningDark?: string;
}
