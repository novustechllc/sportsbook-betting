import { SyntheticEvent } from 'react';

import { Alert, Button, Fade, Grow, IconButton, Slide, SlideProps, Snackbar as MuiSnackbar } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { KeyedObject } from 'types';
import { useDispatch, useSelector } from 'store';
import { closeSnackbar } from 'store/reducers/snackbar';

function TransitionSlideLeft(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
    return <Grow {...props} />;
}

const animation: KeyedObject = {
    SlideLeft: TransitionSlideLeft,
    SlideUp: TransitionSlideUp,
    SlideRight: TransitionSlideRight,
    SlideDown: TransitionSlideDown,
    Grow: GrowTransition,
    Fade
};

const Snackbar = () => {
    const dispatch = useDispatch();
    const snackbar = useSelector((state) => state.snackbar);
    const { actionButton, anchorOrigin, alert, close, message, open, transition, variant } = snackbar;

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };

    return (
        <>
            {/* default snackbar */}
            {variant === 'default' && (
                <MuiSnackbar
                    sx={{
                        zIndex: 14000
                    }}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    TransitionComponent={animation[transition]}
                    action={
                        <>
                            <Button color="secondary" size="small" onClick={handleClose}>
                                UNDO
                            </Button>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25 }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            )}

            {/* alert snackbar */}
            {variant === 'alert' && (
                <MuiSnackbar
                    sx={{
                        zIndex: 14000
                    }}
                    TransitionComponent={animation[transition]}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        variant={alert.variant}
                        color={alert.color}
                        action={
                            <>
                                {actionButton !== false && (
                                    <Button size="small" onClick={handleClose} sx={{ color: 'background.paper' }}>
                                        UNDO
                                    </Button>
                                )}
                                {close !== false && (
                                    <IconButton sx={{ color: 'background.paper' }} size="small" aria-label="close" onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </>
                        }
                        sx={{
                            ...(alert.variant === 'outlined' && {
                                bgcolor: 'background.paper'
                            })
                        }}
                    >
                        {message}
                    </Alert>
                </MuiSnackbar>
            )}
        </>
    );
};

export default Snackbar;
