import { AnimatePresence, motion } from 'framer-motion';
import ArrowLeft from './ArrowLeft.svg?react';
import ArrowRight from './ArrowRight.svg?react';
import './slider.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNfts, type NftCard, skeletonNftCard } from '@/store';
import { Card } from '../card';

export const Slider: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useAppSelector((state) => state.nfts);
	const [sliceItems, setSliceItems] = useState<NftCard[]>(Array(7).fill(skeletonNftCard));

	const previousElementCardCenter = useCallback(() => {
		setSliceItems((prev) => {
			if (items.length === 0) return prev;

			const lastItemIndex = items.indexOf(prev[prev.length - 1]);

			const startIndex = (lastItemIndex - 7 + items.length) % items.length;
			const takeCount = Math.min(items.length, 7);

			return [...items, ...items].slice(startIndex, startIndex + takeCount);
		});
	}, [items]);

	const nextElementCardCenter = useCallback(() => {
		setSliceItems((prev) => {
			if (items.length === 0) return prev;

			const firstItemIndex = items.indexOf(prev[0]);

			const startIndex = (firstItemIndex + 1) % items.length;
			const takeCount = Math.min(items.length, 7);

			return [...items, ...items].slice(startIndex, startIndex + takeCount);
		});
	}, [items]);

	const hasFetched = useRef(false);
	useEffect(() => {
		if (status === 'idle' && !hasFetched.current) hasFetched.current = !!dispatch(fetchNfts());
	}, [dispatch, status]);

	useEffect(() => {
		status === 'succeeded' && items.length > 0 && setSliceItems(items.length > 7 ? items.slice(0, 7) : items);
	}, [status, items]);

	return (
		<motion.section className='funtech-slider' initial='hidden' animate='visible'>
			<div className='container'>
				{status === 'failed' && <div />}
				{sliceItems.map((item, i) => (
					<Card key={item.id + i} nft={item} />
				))}
			</div>
			<AnimatePresence mode='wait'>
				<motion.aside
					initial={{ opacity: 0 }}
					animate={{ opacity: status === 'succeeded' ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.button onClick={previousElementCardCenter}>
						<ArrowLeft />
					</motion.button>
					<motion.button onClick={nextElementCardCenter}>
						<ArrowRight />
					</motion.button>
				</motion.aside>
			</AnimatePresence>
		</motion.section>
	);
};
