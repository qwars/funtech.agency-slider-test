import LogoSVG from "./Logo.svg?react";
import "./logo.scss";
export const Logo: React.FC = () => {
	return (
		<a className="funtech-slider-logo" href="/">
			<LogoSVG />
			<span>DiveSea</span>
		</a>
	);
};
