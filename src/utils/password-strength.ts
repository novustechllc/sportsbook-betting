import { NumbColorFunc, StringBoolFunc, StringNumFunc } from 'types';
import value from 'assets/scss/_themes-vars.module.scss';

const hasNumber: StringBoolFunc = (number) => new RegExp(/[0-9]/).test(number);

const hasMixed: StringBoolFunc = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

const hasSpecial: StringBoolFunc = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthColor: NumbColorFunc = (count) => {
    if (count < 2) return { label: 'Poor', color: value.errorMain };
    if (count < 3) return { label: 'Weak', color: value.warningDark };
    if (count < 4) return { label: 'Normal', color: value.orangeMain };
    if (count < 5) return { label: 'Good', color: value.successMain };
    if (count < 6) return { label: 'Strong', color: value.successDark };
    return { label: 'Poor', color: value.errorMain };
};

export const strengthIndicator: StringNumFunc = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
