import { motion } from 'framer-motion';
import type React from 'react';
import './loader.scss';

export const Loader: React.FC = () => {
	return (
		<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}></motion.div>
	);
};
