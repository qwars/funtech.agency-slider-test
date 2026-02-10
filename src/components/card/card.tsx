import { useTimer } from '@/hooks';
import './card.scss';

import type { NftCard } from '@store';
import { motion } from 'framer-motion';

interface Props {
	nft: NftCard;
}

export const Card: React.FC<Props> = ({ nft }) => {
	const timeLeft = useTimer(nft.endTime);
	return (
		<motion.figure
			className='funtech-slider-card'
			whileHover={{ y: -10, scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300 }}
		>
			<motion.aside>{timeLeft}</motion.aside>
			<motion.img src={nft.imageUrl} alt='alt' />
			<motion.figcaption>
				<h4>{nft.name}</h4>
				<motion.aside>
					<dfn>{nft.id}</dfn>
					<var>{nft.currentBid}</var>
					<motion.button>PLACE BID</motion.button>
				</motion.aside>
			</motion.figcaption>
		</motion.figure>
	);
};
