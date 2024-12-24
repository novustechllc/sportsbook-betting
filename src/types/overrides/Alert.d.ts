import * as Alert from '@mui/material/Alert';

declare module '@mui/material/Alert' {
    interface AlertPropsColorOverrides {
        primary;
        secondary;
    }
}
