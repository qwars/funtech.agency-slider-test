import { motion } from "framer-motion";
import ArrowLeft from "./ArrowLeft.svg?react";
import ArrowRight from "./ArrowRight.svg?react";
import "./slider.scss";
import { Card } from "../card";

export const Slider: React.FC = () => {
	return (
		<motion.section
			className="funtech-slider"
			initial="hidden"
			animate="visible"
		>
			<div className="container">
				<Card />
			</div>
			<aside>
				<motion.button>
					<ArrowLeft />
				</motion.button>
				<motion.button>
					<ArrowRight />
				</motion.button>
			</aside>
		</motion.section>
	);
};
