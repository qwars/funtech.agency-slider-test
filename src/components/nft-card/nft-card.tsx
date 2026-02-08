import type { NftCard } from "@store";
import type React from "react";
import "./nft-card.scss";
import { motion } from "framer-motion";

interface Props {
	nft: NftCard;
}

export const CardNft: React.FC<Props> = ({ nft }) => {
	nft;
	return (
		<motion.div
			whileHover={{ y: -10, scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300 }}
		></motion.div>
	);
};
