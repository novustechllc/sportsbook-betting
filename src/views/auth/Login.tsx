import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useDispatch } from 'store';
import { ChangePage } from 'store/reducers/menu';

import AuthMetamask from './auth-forms/AuthMetamask';

const Login = () => {
    const dispatch = useDispatch();

    return (
        <Dialog
            open={true}
            onClose={() => dispatch(ChangePage(''))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ zIndex: '999 !important' }}
        >
            <DialogContent sx={{ overflow: 'hidden !important' }}>
                <AuthMetamask />
            </DialogContent>
        </Dialog>
    );
};

export default Login;
