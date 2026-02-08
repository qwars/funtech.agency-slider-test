import { configureStore } from "@reduxjs/toolkit";
import nftSlice from "./nft-slice";

export const store = configureStore({
	reducer: {
		nfts: nftSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
