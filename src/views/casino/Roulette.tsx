import { Component } from 'react';
import { Box, Button, InputAdornment, OutlinedInput, Stack, Tab, Tabs, tabsClasses, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import $ from 'jquery';
import classnames from 'classnames';

import config from 'config';

import Axios from 'utils/axios';
import snackbar from 'utils/snackbar';
import { abbreviate } from 'utils/sports';
import { resultPopup } from 'utils/games';
import { toNumber, toNumberTag } from 'utils/number';

import { store } from 'store';
import { ChangePage } from 'store/reducers/menu';

import { PropsType } from './Blackjack/Model';

const Ornament =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjcycHgiIGhlaWdodD0iNzJweCIgdmlld0JveD0iMCAwIDcyIDcyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MiAoMzY3ODEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPldoZWVsIGhhbmRsZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGQ9Ik0zOC4xMzgxMjA1LDcuMzgxMjA1MzkgTDM5Ljg1NjQxMzgsMjQuNTY0MTM4MiBDNDMuMjUyMjg3OSwyNS43MDMwNjM2IDQ2LjA0NzM1NTcsMjguNDgyNDUxOCA0Ny4yOTYzMDMzLDMyLjEyOTYyOTYgTDY0LjYxODc5NDYsMzMuODYxODc5NSBDNjUuMzI3ODk2MiwzMi43NDI4NTggNjYuNTc3MTk2MiwzMiA2OCwzMiBDNzAuMjA5MTM5LDMyIDcyLDMzLjc5MDg2MSA3MiwzNiBDNzIsMzguMjA5MTM5IDcwLjIwOTEzOSw0MCA2OCw0MCBDNjYuNTc3MTk2Miw0MCA2NS4zMjc4OTYyLDM5LjI1NzE0MiA2NC42MTg3OTQ2LDM4LjEzODEyMDUgTDQ3LjQ0MTg1NywzOS44NTU4MTQzIEM0Ni4yNzUxMzgyLDQzLjM5MDk4NjEgNDMuMzkwOTg2MSw0Ni4yNzUxMzgyIDM5Ljg1NTgxNDMsNDcuNDQxODU3IEwzOC4xMzgxMjA1LDY0LjYxODc5NDYgQzM5LjI1NzE0Miw2NS4zMjc4OTYyIDQwLDY2LjU3NzE5NjIgNDAsNjggQzQwLDcwLjIwOTEzOSAzOC4yMDkxMzksNzIgMzYsNzIgQzMzLjc5MDg2MSw3MiAzMiw3MC4yMDkxMzkgMzIsNjggQzMyLDY2LjU3NzE5NjIgMzIuNzQyODU4LDY1LjMyNzg5NjIgMzMuODYxODc5NSw2NC42MTg3OTQ2IEwzMi4xMjk2MzA3LDQ3LjI5NjMwNzEgQzI4LjQ4MjQ1MTgsNDYuMDQ3MzU1NyAyNS43MDMwNjM2LDQzLjI1MjI4NzkgMjQuNTY0MTM4MiwzOS44NTY0MTM4IEw3LjM4MTIwNTM5LDM4LjEzODEyMDUgQzYuNjcyMTAzNzksMzkuMjU3MTQyIDUuNDIyODAzNzksNDAgNCw0MCBDMS43OTA4NjEsNDAgOS40MzU1MzIwMmUtMTUsMzguMjA5MTM5IDkuNTcwODAyNzdlLTE1LDM2IEM5LjcwNjA3MzUyZS0xNSwzMy43OTA4NjEgMS43OTA4NjEsMzIgNCwzMiBDNS40MjI4MDM3OSwzMiA2LjY3MjEwMzc5LDMyLjc0Mjg1OCA3LjM4MTIwNTM5LDMzLjg2MTg3OTUgTDI0LjcxMjI4ODMsMzIuMTI4NzcxMiBDMjUuOTMyMTAwMiwyOC42MzEzOTQgMjguNjMxMzk0LDI1LjkzMjEwMDIgMzIuMTI4NzcxMiwyNC43MTIyODgzIEwzMy44NjE4Nzk1LDcuMzgxMjA1MzkgQzMyLjc0Mjg1OCw2LjY3MjEwMzc5IDMyLDUuNDIyODAzNzkgMzIsNCBDMzIsMS43OTA4NjEgMzMuNzkwODYxLC00LjI2MzI1NjQxZS0xNCAzNiwtNC4yNjMyNTY0MWUtMTQgQzM4LjIwOTEzOSwtNC4yNjMyNTY0MWUtMTQgNDAsMS43OTA4NjEgNDAsNCBDNDAsNS40MjI4MDM3OSAzOS4yNTcxNDIsNi42NzIxMDM3OSAzOC4xMzgxMjA1LDcuMzgxMjA1MzkgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlJvdWxldHRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR2FtZS0tLVJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzQyLjAwMDAwMCwgLTIxMC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlJvdWxldHRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAuMDAwMDAwLCA5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJXaGVlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIyLjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlRvcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTYuMDAwMDAwLCA1Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IldoZWVsLWhhbmRsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQuMDAwMDAwLCA0NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRDEwMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0Q2QTk0OSIgY3g9IjM2IiBjeT0iMzYiIHI9IjciPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZCRDYzRSIgY3g9IjM2IiBjeT0iMzYiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
const FULL_CIRCLE = 2 * Math.PI;
const _slotTotal = 37;
const GREEN = '#7FBD35';
const DARK_GREEN = '#71A82F';
const RED = '#E7586A';
const DARK_RED = '#CC4F5E';
const BLACK = '#272933';
const DARK_BLACK = '#24252E';

const _outerColors = [
    GREEN,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK,
    RED,
    BLACK
];
const _innerColors = [
    DARK_GREEN,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK,
    DARK_RED,
    DARK_BLACK
];
const _arcAngle = FULL_CIRCLE / _slotTotal;

const _numbers = [
    '0',
    '32',
    '15',
    '19',
    '4',
    '21',
    '2',
    '25',
    '17',
    '34',
    '6',
    '27',
    '13',
    '36',
    '11',
    '30',
    '8',
    '23',
    '10',
    '5',
    '24',
    '16',
    '33',
    '1',
    '20',
    '14',
    '31',
    '9',
    '22',
    '18',
    '29',
    '7',
    '28',
    '12',
    '35',
    '3',
    '26'
];

const chips = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

const rows = {
    first: ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36'],
    second: ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35'],
    third: ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'],
    red: ['3', '9', '12', '18', '21', '27', '30', '36', '5', '14', '23', '32', '1', '7', '16', '19', '25', '34'],
    black: ['6', '15', '24', '33', '2', '8', '11', '17', '20', '26', '29', '35', '4', '10', '13', '22', '28', '31'],
    numeric: {
        first: ['3', '6', '9', '12', '2', '5', '8', '11', '1', '4', '7', '10'],
        second: ['15', '18', '21', '24', '14', '17', '20', '23', '13', '16', '19', '22'],
        third: ['27', '30', '33', '36', '26', '29', '32', '35', '25', '28', '31', '34']
    },
    half: {
        first: ['3', '6', '9', '12', '15', '18', '2', '5', '8', '11', '14', '17', '1', '4', '7', '10', '13', '16'],
        second: ['21', '24', '27', '30', '33', '36', '20', '23', '26', '29', '32', '35', '19', '22', '25', '28', '31', '34']
    },
    e: {
        opposite: ['6', '12', '18', '24', '30', '36', '2', '8', '14', '20', '26', '32', '4', '10', '16', '22', '28', '34'],
        even: ['3', '9', '15', '21', '27', '33', '5', '11', '17', '23', '29', '35', '1', '7', '13', '19', '25', '31']
    }
};

const numeric = {
    first: [
        { color: 'red', number: '3' },
        { color: 'black', number: '6' },
        { color: 'red', number: '9' },
        { color: 'red', number: '12' },
        { color: 'black', number: '15' },
        { color: 'red', number: '18' },
        { color: 'red', number: '21' },
        { color: 'black', number: '24' },
        { color: 'red', number: '27' },
        { color: 'red', number: '30' },
        { color: 'black', number: '33' },
        { color: 'red', number: '36' }
    ],
    second: [
        { color: 'black', number: '2' },
        { color: 'red', number: '5' },
        { color: 'black', number: '8' },
        { color: 'black', number: '11' },
        { color: 'red', number: '14' },
        { color: 'black', number: '17' },
        { color: 'black', number: '20' },
        { color: 'red', number: '23' },
        { color: 'black', number: '26' },
        { color: 'black', number: '29' },
        { color: 'red', number: '32' },
        { color: 'black', number: '35' }
    ],
    third: [
        { color: 'red', number: '1' },
        { color: 'black', number: '4' },
        { color: 'red', number: '7' },
        { color: 'black', number: '10' },
        { color: 'black', number: '13' },
        { color: 'red', number: '16' },
        { color: 'red', number: '19' },
        { color: 'black', number: '22' },
        { color: 'red', number: '25' },
        { color: 'black', number: '28' },
        { color: 'black', number: '31' },
        { color: 'red', number: '34' }
    ]
} as any;

const numbers = [...numeric.first, ...numeric.second, ...numeric.third, { color: 'green', number: '0' }];
const colors = {
    green: [GREEN, DARK_GREEN, 'black'],
    red: [RED, DARK_RED, 'white'],
    black: [BLACK, DARK_BLACK, 'white']
} as any;

interface StateType {
    loading: boolean;
    amount: number | string;
    totalBet: number;
    chipDisplayValue: number;
    auth: any;
    currency: any;
    bet: any;
    history: any;
}

class Roulette extends Component<PropsType, StateType> {
    canvas: any;

    ctx: any;

    _ornamentImg: any;

    _centerX: any;

    _centerY: any;

    _outerEdge: number = 0;

    _outerRingOuterRadius: number = 0;

    _outerRingInnerRadius: number = 0;

    _innerRingInnerRadius: number = 0;

    _innerRingOuterRadius: number = 0;

    _ornamentX: number = 0;

    _ornamentY: number = 0;

    _ornamentHeight: number = 0;

    _ornamentWidth: number = 0;

    _slotTextRadius: number = 0;

    _slotTextSize: number = 0;

    _startOfTime: number = 0;

    _worldAngle: number = 0;

    _slotTextFont: string = 'normal 12px sans-serif';

    _ballRadius: number = 0;

    _ballX: number = 0;

    _ballY: number = 0;

    _ballVertOffset: number = 0;

    _ballVertRange: number = 0;

    _ballSettingsArcIncrement: number = 0;

    _ballSettingsSpinFinalTime: number = 0;

    _ballSettingsSpinStartTime: number = 0;

    _ballSettingsSpinTimeElapsed: number = 0;

    _ballSettingsSpinTotalTime: number = 0;

    _ballSettingsFinalPosition: number = 0;

    _ballSettingsShowBall: boolean = false;

    constructor(props: PropsType) {
        super(props);
        this.state = {
            loading: false,
            auth: {},
            currency: {
                maxBet: 100000,
                minBet: 1000,
                symbol: 'MBT'
            },
            amount: 1000,
            bet: {},
            totalBet: 0,
            chipDisplayValue: 1,
            history: []
        };
    }

    onPlay = () => {
        const { bet, totalBet, auth } = this.state;
        const betAmount = Number(totalBet);
        if (betAmount < Number(auth.currency.minBet) && betAmount > Number(auth.currency.maxBet)) {
            snackbar(
                `Maximum bet ${auth.currency.maxBet} ${auth.currency.symbol} minimum bet ${auth.currency.minBet} ${auth.currency.symbol}.`
            );
            return;
        }
        this.setState({ loading: true });
        Axios.post('api/v2/games/turn', {
            gameId: 'roulette',
            userId: auth.user._id,
            currency: auth.currency._id,
            bet,
            amount: totalBet
        })
            .then(({ data }) => {
                const time = 2500;
                this.putBallAtSlot(data.number, time);
                setTimeout(() => {
                    resultPopup(data);
                    const { history } = this.state;
                    history.unshift(data);
                    // this.setState({ history: this.state.history });
                    this.setState({ loading: false });
                }, time + 1000);
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    };

    drawFrame = (me: any) => {
        if (me._ballSettingsShowBall) {
            me.ctx.clearRect(0, 0, me.canvas.width, me.canvas.height);
            me.redrawBackground();
            me.ctx.translate(me._centerX, me._centerY);
            me._ballSettingsSpinTimeElapsed = Date.now() - me._ballSettingsSpinStartTime;
            let f = me._ballSettingsSpinTimeElapsed / me._ballSettingsSpinTotalTime;
            f = f > 1 ? 1 : f;
            me.ctx.rotate((me._worldAngle + me._ballSettingsFinalPosition) * f);
            me.ctx.beginPath();
            me.ctx.fillStyle = '#ffffff';
            let vertDeceleration;
            let g = me._ballSettingsSpinTimeElapsed / me._ballSettingsSpinTotalTime;
            g = g > 1 ? 1 : g;
            if (g < 0.1) vertDeceleration = 1;
            else vertDeceleration = (1 - g) * Math.abs(Math.sin(5 * g * g * me._worldAngle));
            const x = me._ballVertOffset + me._ballVertRange * vertDeceleration;
            me.ctx.arc(x, 0, me._ballRadius, 0, FULL_CIRCLE);
            me.ctx.fill();
            me.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        window.requestAnimationFrame(() => me.drawFrame(me));
    };

    redrawBackground = () => {
        for (let i = 0; i < _slotTotal; i += 1) {
            const angle = i * _arcAngle;
            const _endAngle = angle + _arcAngle;
            this.ctx.fillStyle = DARK_BLACK;
            this.ctx.beginPath();
            this.ctx.arc(this._centerX, this._centerY, this._outerEdge, 0, FULL_CIRCLE, true);
            this.ctx.arc(this._centerX, this._centerY, this._outerRingOuterRadius, 0, FULL_CIRCLE, false);
            this.ctx.fill();
            this.ctx.fillStyle = _outerColors[i];
            this.ctx.beginPath();
            this.ctx.arc(this._centerX, this._centerY, this._outerRingOuterRadius, angle, _endAngle, false);
            this.ctx.arc(this._centerX, this._centerY, this._outerRingInnerRadius, _endAngle, angle, true);
            this.ctx.fill();
            this.ctx.fillStyle = _innerColors[i];
            this.ctx.beginPath();
            this.ctx.arc(this._centerX, this._centerY, this._innerRingOuterRadius, angle, _endAngle, false);
            this.ctx.arc(this._centerX, this._centerY, this._innerRingInnerRadius, _endAngle, angle, true);
            this.ctx.fill();
            this.ctx.fillStyle = DARK_BLACK;
            this.ctx.beginPath();
            this.ctx.arc(this._centerX, this._centerY, this._innerRingInnerRadius, 0, FULL_CIRCLE, true);
            this.ctx.arc(this._centerX, this._centerY, 0, 0, FULL_CIRCLE, false);
            this.ctx.fill();
            this.ctx.save();
            this.ctx.font = this._slotTextFont;
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.translate(
                this._centerX + Math.cos(angle + _arcAngle / 2) * this._slotTextRadius,
                this._centerY + Math.sin(angle + _arcAngle / 2) * this._slotTextRadius
            );
            this.ctx.rotate(angle + _arcAngle / 2 + Math.PI / 2);
            this.ctx.fillText(_numbers[i], -this.ctx.measureText(_numbers[i]).width / 2, 0);
            this.ctx.restore();
        }
        const f = () => {
            this.ctx.translate(this._centerX, this._centerY);
            this.ctx.drawImage(this._ornamentImg, this._ornamentX, this._ornamentY, this._ornamentWidth, this._ornamentHeight);
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        };
        if (this._ballSettingsShowBall) f();
        else setTimeout(f, 100);
        this.ctx.save();
    };

    init = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._worldAngle = 0;
        this._centerX = this.canvas.width / 2;
        this._centerY = this.canvas.height / 2;
        this._outerEdge = this.canvas.width / 2;
        this._outerRingOuterRadius = (this.canvas.width * 0.9) / 2;
        this._outerRingInnerRadius = (this.canvas.width * 0.75) / 2;
        this._innerRingOuterRadius = this._outerRingInnerRadius;
        this._innerRingInnerRadius = this._innerRingOuterRadius * 0.8;
        this._slotTextRadius = this._outerRingInnerRadius + (this._outerRingOuterRadius - this._outerRingInnerRadius) * 0.35;
        this._slotTextSize = (this._outerRingOuterRadius - this._outerRingInnerRadius) * 0.5;
        this._slotTextFont = `normal ${this._slotTextSize}px sans-serif`;
        this._ornamentImg = new Image();
        this._ornamentImg.src = Ornament;
        this._ornamentX = -this._innerRingInnerRadius / 2;
        this._ornamentY = -this._innerRingInnerRadius / 2;
        this._ornamentWidth = this._innerRingInnerRadius;
        this._ornamentHeight = this._innerRingInnerRadius;
        this._ballRadius = ((this.canvas.width / 2 - this._outerRingOuterRadius) / 2) * 0.9;
        this._ballVertOffset = this._innerRingInnerRadius + this._ballRadius;
        this._ballVertRange = this._outerRingOuterRadius - this._innerRingInnerRadius;
        this._startOfTime = Date.now();
        this.redrawBackground();
        window.requestAnimationFrame(() => this.drawFrame(this));
        const disableChipsFor = (elementId: any, chip: any) => {
            elementId = `[data-chip='${elementId}']`;
            $(elementId).on('mouseover', () => {
                // eslint-disable-next-line
                $.each($('.chip'), function (i, e) {
                    if (chip.includes($(this).attr('data-chip'))) $(this).addClass('chip-disabled');
                });
            });
            $(elementId).on('mouseleave', () => {
                $('.chip').removeClass('chip-disabled');
            });
        };
        disableChipsFor('row1', rows.second.concat(rows.third));
        disableChipsFor('row2', rows.first.concat(rows.third));
        disableChipsFor('row3', rows.first.concat(rows.second));
        disableChipsFor('red', rows.black);
        disableChipsFor('black', rows.red);
        disableChipsFor('1-12', rows.numeric.second.concat(rows.numeric.third));
        disableChipsFor('13-24', rows.numeric.first.concat(rows.numeric.third));
        disableChipsFor('25-36', rows.numeric.first.concat(rows.numeric.second));
        disableChipsFor('1-18', rows.half.second);
        disableChipsFor('19-36', rows.half.first);
        disableChipsFor('odd', rows.e.opposite);
        disableChipsFor('even', rows.e.even);
        const instance = this;
        // eslint-disable-next-line
        $('[data-chip]').on('click', function () {
            if (instance.state.amount == null) return;
            let stack = $(this).find('.bet-stack');
            if (stack.length === 0) {
                stack = $(`<div class='bet-stack'></div>`);
                stack.hide().fadeIn('fast');
                $(this).append(stack);
            }
            const e = $(
                `<div class='user-chip' data-display-value='${instance.state.chipDisplayValue}' data-token-value='${
                    instance.state.amount
                }' style='margin-top: -${stack.children().length * 9}px'>${abbreviate(instance.state.chipDisplayValue, 0)}</Box>`
            );
            stack.append(e);
            const b = $(this).attr('data-chip');
            instance.setBet(b, Number(instance.getBet(b)) + Number(instance.state.amount) * Number(instance.state.chipDisplayValue));
        });
    };

    getBet = (chip: any) => {
        const { bet } = this.state;
        if (bet[chip] == null) return 0;
        return bet[chip];
    };

    setBet = (chip: string | null = null, value: number | null = null) => {
        const { bet } = this.state;
        if (chip !== null && value !== null) {
            this.setState({ bet: { ...bet, [chip]: value } });
            const totalAmount = Object.values({ ...bet, [chip]: value }).reduce((sum: number, n: any) => {
                sum += Number(n);
                return sum;
            }, 0);
            this.setState({ totalBet: totalAmount });
        }
    };

    clear = () => {
        this.setState({ bet: {}, totalBet: 0 });
        // eslint-disable-next-line
        $('.bet-stack').fadeOut('fast', function () {
            $(this).remove();
        });
    };

    findIndexOfSlot = (num: number) => {
        const slotNum = _numbers.indexOf(String(num));
        if (slotNum < 0) return false;
        return {
            index: slotNum,
            position: _arcAngle * (slotNum + 0.5)
        };
    };

    initBallSpin = (time = 5000) => {
        this._ballSettingsSpinTotalTime = time;
        this._ballSettingsSpinStartTime = Date.now();
        this._ballSettingsSpinFinalTime = this._ballSettingsSpinStartTime + this._ballSettingsSpinTotalTime;
        setTimeout(() => {
            this._ballSettingsShowBall = false;
        }, time + 1000);
    };

    putBallAtSlot = (num: number, time: number) => {
        const slot = this.findIndexOfSlot(num);
        if (slot === false) {
            this._ballSettingsShowBall = false;
            return;
        }
        this.initBallSpin(time);
        this._ballSettingsFinalPosition = 5 * 2 * Math.PI + slot.position - 0.005;
        this._ballSettingsArcIncrement = this._ballSettingsFinalPosition / this._ballSettingsSpinTotalTime;
        this._ballSettingsShowBall = true;
    };

    componentDidMount = () => {
        this.canvas = $('.game-roulette').find('.roulette-wheel')[0];
        this.ctx = this.canvas.getContext('2d');
        this.init();
        const { auth } = this.state;
        const state = store.getState() as any;
        if (state.auth !== auth || state.auth.isLoggedIn !== auth.isLoggedIn) {
            this.setState({ auth: state.auth, currency: state.auth.currency, amount: state.auth.currency.minBet });
        }
    };

    render = () => {
        const { currency, totalBet, loading, auth, amount, chipDisplayValue, history } = this.state;
        return (
            <Stack
                className="game-container game-roulette"
                sx={{
                    flexDirection: 'row',
                    '@media (max-width:1024px)': {
                        flexDirection: 'column'
                    }
                }}
            >
                <Stack
                    sx={{
                        boxShadow: config.boxShadow,
                        p: 2,
                        width: '300px',
                        '@media (max-width:1024px)': {
                            width: '100%'
                        }
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography>
                            <FormattedMessage id="Chip Value" />
                        </Typography>
                        <Stack direction="row">
                            <Typography>{toNumber(Number(chipDisplayValue) * Number(amount), 5, true)}</Typography>
                            <img width="16px" src={currency?.icon} alt="icon" style={{ marginRight: '5px' }} />
                        </Stack>
                    </Stack>
                    <Tabs
                        value={chipDisplayValue}
                        onChange={(e, value: number) => this.setState({ chipDisplayValue: value })}
                        variant="scrollable"
                        scrollButtons="auto"
                        className="wager-chip wager-selector"
                        sx={{
                            background: '#181d2d',
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 }
                            },
                            '& .MuiTabs-flexContainer': {
                                border: 'none',
                                my: '5px'
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            }
                        }}
                    >
                        {chips.map((item, key) => (
                            <Tab
                                key={key}
                                value={item}
                                data-token-value={item}
                                data-display-value={item}
                                className={classnames('chip', {
                                    active: item === chipDisplayValue
                                })}
                                label={abbreviate(item, 0)}
                            />
                        ))}
                    </Tabs>
                    <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography>
                            <FormattedMessage id="Bet Amount" />
                        </Typography>
                        {/* <Typography>${toNumber(Number(totalBet) * currency.price, 5, true)}</Typography> */}
                    </Stack>
                    <OutlinedInput
                        id="amount"
                        size="small"
                        type="number"
                        sx={{
                            boxShadow: config.boxShadow,
                            width: '100%',
                            borderRadius: 1,
                            mt: 1,
                            pr: 0,
                            '& fieldset': {
                                borderWidth: '2px',
                                borderRadius: 1,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }
                        }}
                        value={amount || ''}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                        endAdornment={
                            <InputAdornment position="end">
                                <img width="16px" src={currency?.icon} alt="icon" style={{ marginRight: '5px' }} />
                                <Stack direction="row" spacing={0.5} px={1}>
                                    <Button
                                        sx={{
                                            background: '#343c5b',
                                            width: '25px',
                                            height: '25px',
                                            minWidth: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        onClick={() => this.setState({ amount: Number(amount) / 2 })}
                                    >
                                        ½
                                    </Button>
                                    <Button
                                        sx={{
                                            background: '#343c5b',
                                            width: '25px',
                                            height: '25px',
                                            minWidth: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        onClick={() => this.setState({ amount: Number(amount) * 2 })}
                                    >
                                        2×
                                    </Button>
                                </Stack>
                            </InputAdornment>
                        }
                    />
                    {auth && auth.isLoggedIn ? (
                        <Button
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() => this.onPlay()}
                        >
                            <FormattedMessage id="Bet" />
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() => store.dispatch(ChangePage('login'))}
                        >
                            <FormattedMessage id="Sign in" />
                        </Button>
                    )}
                </Stack>
                <Stack
                    sx={{
                        background: '#181D2D',
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        pt: 2
                    }}
                >
                    <Box className="game-content game-content-roulette">
                        <Box className="mt-1">
                            <canvas className="roulette-wheel" width="600" height="600" />
                            <Box className="roulette-field">
                                <Box className="header">
                                    <FormattedMessage id="Bet Amount" />:<span id="bet">{toNumberTag(totalBet)}</span>
                                    <Box className="right">
                                        <Button onClick={() => this.clear()}>
                                            <FormattedMessage id="Clear" />
                                        </Button>
                                    </Box>
                                </Box>
                                <Box className="content">
                                    <Box className="side">
                                        <Box className="chip green" data-chip="0">
                                            0
                                        </Box>
                                    </Box>
                                    <Box className="numeric">
                                        {Object.keys(numeric).map((item, key) => (
                                            <Box className="r" key={key}>
                                                {(numeric[item] as any[]).map((n, index) => (
                                                    <Box key={index} className={`chip ${n.color}`} data-chip={n.number}>
                                                        {n.number}
                                                    </Box>
                                                ))}
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box className="side">
                                        <Box className="chip bordered" data-chip="row1">
                                            2:1
                                        </Box>
                                        <Box className="chip bordered" data-chip="row2">
                                            2:1
                                        </Box>
                                        <Box className="chip bordered" data-chip="row3">
                                            2:1
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="content">
                                    <Box className="side" />
                                    <Box className="numeric">
                                        <Box className="r">
                                            <Box className="chip bordered" data-chip="1-12">
                                                1-12
                                            </Box>
                                            <Box className="chip bordered" data-chip="13-24">
                                                13-24
                                            </Box>
                                            <Box className="chip bordered" data-chip="25-36">
                                                25-35
                                            </Box>
                                        </Box>
                                        <Box className="r">
                                            <Box className="chip bordered" data-chip="1-18">
                                                1-18
                                            </Box>
                                            <Box className="chip bordered" data-chip="even">
                                                <FormattedMessage id="even" />
                                            </Box>
                                            <Box className="chip red" data-chip="red" />
                                            <Box className="chip black" data-chip="black" />
                                            <Box className="chip bordered" data-chip="odd">
                                                <FormattedMessage id="odd" />
                                            </Box>
                                            <Box className="chip bordered" data-chip="19-36">
                                                19-36
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="side" />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="customHistory">
                            {history.map((item: any, key: number) => {
                                const data = numbers.find((e) => String(e.number) === String(item.number));
                                const color = colors[data.color];
                                return (
                                    <Box
                                        key={key}
                                        style={{
                                            background: color[0],
                                            borderBottom: `1px solid ${color[1]}`,
                                            color: color[2]
                                        }}
                                        data-custom-history={key}
                                        className="element"
                                    >
                                        {item.number}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        );
    };
}

export default Roulette;
