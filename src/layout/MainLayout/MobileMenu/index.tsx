import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Stack, Typography } from '@mui/material';

import { IconMenu2, IconReceipt } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';
import { openBetslip } from 'store/reducers/sports';

import useConfig from 'hooks/useConfig';
import AnimateButton from 'ui-component/extended/AnimateButton';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { boxShadow } = useConfig();
    const { betslipData } = useSelector((state) => state.sports);
    return (
        <Stack
            direction="row"
            justifyContent="space-around"
            sx={{
                position: 'fixed',
                width: '100vw',
                bottom: 0,
                alignItems: 'center',
                height: '60px',
                background: '#0a0e16',
                zIndex: 1,
                boxShadow
            }}
        >
            <AnimateButton>
                <Stack alignItems="center" onClick={() => dispatch(openDrawer(true))}>
                    <IconMenu2 stroke={1.5} size="20px" />
                    <Typography sx={{ fontSize: '12px', color: '#fff' }}>
                        <FormattedMessage id="Menu" />
                    </Typography>
                </Stack>
            </AnimateButton>
            <AnimateButton>
                <Badge badgeContent={betslipData.length} color="primary">
                    <Stack alignItems="center" onClick={() => dispatch(openBetslip(true))}>
                        <IconReceipt stroke={1.5} size="20px" />
                        <Typography sx={{ fontSize: '12px', color: '#fff' }}>
                            <FormattedMessage id="Bets" />
                        </Typography>
                    </Stack>
                </Badge>
            </AnimateButton>
            <AnimateButton>
                <Stack alignItems="center" onClick={() => navigate('/sports')}>
                    <i className="sportsicons sportsicon-1" style={{ fontSize: '16px', padding: '2px' }} />
                    <Typography sx={{ fontSize: '12px', color: '#fff' }}>
                        <FormattedMessage id="Sports" />
                    </Typography>
                </Stack>
            </AnimateButton>
        </Stack>
    );
};

export default memo(MobileMenu);
