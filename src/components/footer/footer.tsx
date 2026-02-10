import { Logo } from '../logo';
import './footer.scss';
export const Footer: React.FC = () => {
	return (
		<footer className='funtech-slider-footer'>
			<section>
				<Logo />
				<nav>
					<a href='#privacy-policy'>Privacy Policy</a>
					<a href='#term-conditions'>term & Conditions</a>
					<a href='#about-us'>About Us</a>
					<a href='#contact'>Contact</a>
				</nav>
			</section>
			<aside>
				<span>© 2023 </span>
				<span>DiveSea All Rights Reserved.</span>
			</aside>
		</footer>
	);
};
