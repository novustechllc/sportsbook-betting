import { useEffect, useState } from 'react';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { Button, CardActions, Divider, Grid, TextField, Typography, useTheme } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';

import { BASE_URL } from 'config';
import useApi from 'hooks/useApi';
import snackbar from 'utils/snackbar';

import { gridSpacing } from 'store/constant';
import { UpdateInfo } from 'store/reducers/auth';
import { useDispatch, useSelector } from 'store';

import Avatar from 'ui-component/extended/Avatar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Avatar1 from 'assets/images/users/avatar.png';

const UserProfile = () => {
    const Api = useApi();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { user } = useSelector((state) => state.auth);
    const [email, setEmail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const onChange = (e: any) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < 800000) {
                fileUpload(file);
            } else {
                snackbar(formatMessage({ id: 'The file size is too large.' }));
            }
        }
    };

    const fileUpload = (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        Api.uploadFile(formData).then(({ data }) => {
            setAvatar(data.uri);
            UpdateInfoApi(data.uri);
        });
    };

    const onReset = () => {
        if (!avatar) return;
        Api.deleteFile(avatar)
            .then(({ data }) => {
                setAvatar('');
                UpdateInfoApi('');
            })
            .catch((error) => {
                setAvatar('');
                UpdateInfoApi('');
            });
    };

    const UpdateInfoApi = (params: string) => {
        Api.updateUserInfo({
            username: username !== '' ? username : user?.publicAddress,
            email: email !== '' ? email : user?.publicAddress,
            avatar: params === null ? avatar : params,
            update: true
        }).then(({ data }) => {
            dispatch(UpdateInfo(data));
            snackbar(formatMessage({ id: 'Success!' }));
        });
    };

    useEffect(() => {
        if (user?.publicAddress !== user?.email) {
            setEmail(user?.email as string);
        }
        if (user?.publicAddress !== user?.username) {
            setUsername(user?.username as string);
        }
        setAvatar(user?.avatar as string);
    }, [user]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    <FormattedMessage id="Account" />
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption">
                    <FormattedMessage id="User Id" />
                    :&nbsp;
                    {user._id}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar alt="Avatar" src={avatar ? `${BASE_URL}/${avatar}` : Avatar1} sx={{ height: 80, width: 80 }} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                    <FormattedMessage id="Image size Limit should be 800KB Max." />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="containedButtonFile" style={{ position: 'relative' }}>
                                    <input
                                        onChange={onChange}
                                        accept="image/*"
                                        style={{
                                            opacity: 0,
                                            position: 'absolute',
                                            width: '100%',
                                            height: '2rem',
                                            zIndex: 1,
                                            padding: 0.5,
                                            cursor: 'pointer'
                                        }}
                                        id="containedButtonFile"
                                        multiple
                                        type="file"
                                    />
                                    <Button variant="outlined" size="small">
                                        <FormattedMessage id="Upload" />
                                    </Button>
                                </label>
                                <Button onClick={onReset} size="small" sx={{ color: theme.palette.error.main, ml: 1 }}>
                                    <FormattedMessage id="Clear" />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    label={formatMessage({ id: 'Email Address' })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    label={formatMessage({ id: 'User Name' })}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Divider sx={{ mb: 2 }} />
                <CardActions sx={{ pt: 2, p: 0 }}>
                    <Grid spacing={2} container justifyContent="flex-end">
                        <Grid item>
                            <AnimateButton>
                                <Button onClick={() => UpdateInfoApi(avatar)} variant="outlined">
                                    <FormattedMessage id="Update" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
