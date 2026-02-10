import { useCallback, useState } from 'react';
import { Logo } from '../logo';
import BurgerSVG from './header-burger.svg?react';
import CloseSVG from './header-close.svg?react';
import './header.scss';

export const Header: React.FC = () => {
	const [menuState, setMenuState] = useState<boolean>(true);
	const togglerMenuStateCallback = useCallback(() => setMenuState((prev) => !prev), []);
	return (
		<header className='funtech-slider-header'>
			<Logo />
			<nav aria-hidden={menuState}>
				<a href='#discover'>Discover</a>
				<a href='#creators'>creators</a>
				<a href='#sell'>Sell</a>
				<a href='#stats'>stats</a>
			</nav>
			<aside onClick={togglerMenuStateCallback}>
				<CloseSVG />
				<BurgerSVG />
			</aside>
		</header>
	);
};
