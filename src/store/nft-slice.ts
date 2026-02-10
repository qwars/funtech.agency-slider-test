import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IMAGES } from './constants';

export type NftCard = {
	id: string;
	contract_address?: string;
	name: string;
	asset_platform_id?: string;
	symbol?: string;
	currentBid: string;
	endTime: number;
	imageUrl: string;
};

interface NftState {
	error: string | null;
	items: NftCard[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NftState = {
	error: null,
	items: [],
	status: 'idle',
};

export const fetchNfts = createAsyncThunk('nfts/fetchNfts', async (_, { rejectWithValue, signal }) => {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);
	try {
		const response = await fetch(import.meta.env.VITE_API_URL, {
			signal: signal || controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}

		const data = (await response.json()) as NftCard[];
		return data;
	} catch (error) {
		clearTimeout(timeoutId);

		if (error instanceof Error) {
			if (error.name === 'AbortError') {
				return rejectWithValue('Request timeout');
			}
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Unknown error occurred');
	}
});

const generateRandomImageUrl = () => {
	return IMAGES[Math.floor(Math.random() * IMAGES.length)];
};

const generateRandomBid = () => {
	const ethAmount = (Math.random() * 5 + 0.1).toFixed(3);
	return `${ethAmount}`;
};

const generateRandomEndTime = () => {
	const days = Math.floor(Math.random() * 7) + 1;
	const hours = Math.floor(Math.random() * 24);
	const now = Date.now();
	return now + (days * 24 + hours) * 60 * 60 * 1000;
};

const slice = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(fetchNfts.pending, (state) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchNfts.fulfilled, (state, action: PayloadAction<NftCard[]>) => {
				state.status = 'succeeded';
				state.items = action.payload.map((nft) => ({
					...nft,
					currentBid: generateRandomBid(),
					endTime: generateRandomEndTime(),
					imageUrl: generateRandomImageUrl(),
				}));
			})
			.addCase(fetchNfts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = (action.payload as string) || 'Failed to fetch NFTs';
			});
	},
	initialState,
	name: 'nfts',
	reducers: {},
});

export default slice.reducer;
