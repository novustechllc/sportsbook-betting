import { HOME_PATH } from 'config';
import Logo from 'ui-component/Logo';

const LogoSection = () => (
    <a href={HOME_PATH} style={{ display: 'flex' }}>
        <Logo />
    </a>
);

export default LogoSection;
