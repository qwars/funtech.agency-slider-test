import { configureStore } from '@reduxjs/toolkit';
import nftSlice from './nft-slice';

export type NftCard = {
	id: string;
	contract_address?: string;
	name: string;
	asset_platform_id?: string;
	symbol?: string;
};
export const skeletonNftCard = {
	id: '',
	name: 'skeleton',
};

export const store = configureStore({
	reducer: {
		nfts: nftSlice,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
