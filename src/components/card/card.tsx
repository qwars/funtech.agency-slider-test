import "./card.scss";
import { motion } from "framer-motion";
/* 
import type { NftCard } from '@store';
interface Props {
	nft: NftCard;
}

export const Card: React.FC<Props> = ({ nft }) => {

	nft;
 */
export const Card: React.FC = () => {
	return (
		<motion.figure
			className="funtech-slider-card"
			whileHover={{ y: -10, scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			<motion.aside></motion.aside>
			<motion.img src="https://picsum.photos/200/300" alt="alt" />
			<motion.figcaption>
				<h4>Text</h4>
				<motion.aside>
					<dfn>dfn</dfn>
					<var>var</var>
					<motion.button>PLACE BID</motion.button>
				</motion.aside>
			</motion.figcaption>
		</motion.figure>
	);
};
