import { useMemo, ReactNode } from 'react';

import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    Theme,
    ThemeOptions,
    ThemeProvider,
    TypographyVariantsOptions
} from '@mui/material';

import useConfig from 'hooks/useConfig';
import { CustomShadowProps } from 'types/default-theme';

import Palette from './palette';
import Typography from './typography';

import customShadows from './shadows';
import componentStyleOverrides from './compStyleOverride';

interface Props {
    children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
    const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = useConfig();

    const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

    // eslint-disable-next-line
    const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(navType, theme), [navType, theme]);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: rtlLayout ? 'rtl' : 'ltr',
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '0',
                    '@media (min-width: 600px)': {
                        padding: '0',
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [rtlLayout, theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(
        () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
        [themes, borderRadius, outlinedFilled]
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
