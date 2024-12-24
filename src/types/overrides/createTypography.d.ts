import * as createTypography from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
    export interface FontStyle
        extends Required<{
            textTransform: TextTransform;
            fontSize: string | number;
        }> {}
    export interface FontStyleOptions extends Partial<FontStyle> {
        fontSize?: string | number;
    }
    export type Variant =
        | 'customInput'
        | 'mainContent'
        | 'menuCaption'
        | 'subMenuCaption'
        | 'commonAvatar'
        | 'smallAvatar'
        | 'mediumAvatar'
        | 'largeAvatar';

    export interface TypographyOptions extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {
        customInput?: TypographyStyleOptions;
        mainContent?: TypographyStyleOptions;
        menuCaption?: TypographyStyleOptions;
        subMenuCaption?: TypographyStyleOptions;
        commonAvatar?: TypographyStyleOptions;
        smallAvatar?: TypographyStyleOptions;
        mediumAvatar?: TypographyStyleOptions;
        largeAvatar?: TypographyStyleOptions;
    }

    export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {
        customInput: TypographyStyle;
        mainContent: TypographyStyle;
        menuCaption: TypographyStyleOptions;
        subMenuCaption: TypographyStyleOptions;
        commonAvatar: TypographyStyle;
        smallAvatar: TypographyStyle;
        mediumAvatar: TypographyStyle;
        largeAvatar: TypographyStyle;
    }
}
