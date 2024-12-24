import { AlertProps, SnackbarOrigin } from '@mui/material';

export interface SnackbarProps {
    action: boolean;
    open: boolean;
    message: string;
    anchorOrigin: SnackbarOrigin;
    variant: string;
    alert: AlertProps;
    transition: string;
    close: boolean;
    actionButton: boolean;
}
