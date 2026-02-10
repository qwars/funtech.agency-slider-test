import { motion } from 'framer-motion';
import './skeleton-card.scss';

export const SkeletonCard: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
		></motion.div>
	);
};
