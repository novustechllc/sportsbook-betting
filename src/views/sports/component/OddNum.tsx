import { Typography } from '@mui/material';
import * as oddslib from 'oddslib';
import { useSelector } from 'store';

const OddNum = ({ odd, color }: { odd: number; color?: string }) => {
    const { user } = useSelector((state) => state.auth);

    const oddFormat = (params: number) => {
        if (user?.oddsformat === undefined || user?.oddsformat === 'decimal') {
            return Number(params).toFixed(2);
        }
        try {
            const number = oddslib.from('decimal', params).to(user.oddsformat);
            if (user.oddsformat === 'moneyline') {
                return Math.floor(number);
            }
            return Number(number).toFixed(2);
        } catch (error) {
            return 0;
        }
    };

    return (
        <Typography className="odd-num" color={color}>
            {oddFormat(odd)}
        </Typography>
    );
};

export default OddNum;
