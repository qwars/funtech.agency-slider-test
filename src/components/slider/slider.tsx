import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import ArrowLeft from './ArrowLeft.svg?react';
import ArrowRight from './ArrowRight.svg?react';
import './slider.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchNfts, type NftCard, skeletonNftCard } from '@/store';
import { Card } from '../card';

const SLIDE_COUNT = 7;
const SLIDE_PERCENTAGE = 100 / SLIDE_COUNT + 0.75;

export const Slider: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useAppSelector((state) => state.nfts);
	const [sliceItems, setSliceItems] = useState<NftCard[]>(Array(7).fill(skeletonNftCard));
	const controls = useAnimation();

	const previousElementCardCenter = useCallback(() => {
		controls.start({ x: `${SLIDE_PERCENTAGE}%` }).then(() =>
			requestAnimationFrame(
				() =>
					controls.set({ x: '0%' }) ??
					setSliceItems((prev) => {
						if (items.length === 0) return prev;

						const lastItemIndex = items.indexOf(prev[prev.length - 1]);

						const startIndex = (lastItemIndex - SLIDE_COUNT + items.length) % items.length;
						const takeCount = Math.min(items.length, SLIDE_COUNT + 2);

						return [...items, ...items].slice(startIndex, startIndex + takeCount);
					}),
			),
		);
	}, [items, controls]);

	const nextElementCardCenter = useCallback(() => {
		controls.start({ x: `-${SLIDE_PERCENTAGE}%` }).then(() =>
			requestAnimationFrame(
				() =>
					controls.set({ x: '0%' }) ??
					setSliceItems((prev) => {
						if (items.length === 0) return prev;

						const firstItemIndex = items.indexOf(prev[0]);

						const startIndex = (firstItemIndex + 1) % items.length;
						const takeCount = Math.min(items.length, SLIDE_COUNT + 2);

						return [...items, ...items].slice(startIndex, startIndex + takeCount);
					}),
			),
		);
	}, [items, controls]);

	const hasFetched = useRef(false);
	useEffect(() => {
		if (status === 'idle' && !hasFetched.current) hasFetched.current = !!dispatch(fetchNfts());
	}, [dispatch, status]);

	useEffect(() => {
		status === 'succeeded' &&
			items.length > 0 &&
			setSliceItems(items.length > SLIDE_COUNT ? items.slice(0, SLIDE_COUNT + 2) : items);
	}, [status, items]);

	return (
		<motion.section className='funtech-slider' initial='hidden' animate='visible'>
			<motion.div className='container' animate={controls} transition={{ duration: 0.3, ease: 'easeInOut' }}>
				{status === 'failed' && <div />}
				{sliceItems.map((item, i) => (
					<Card key={item.id + i} nft={item} />
				))}
			</motion.div>
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
