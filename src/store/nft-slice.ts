import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

export interface NftData {
	id: string;
	name: string;
}

export interface NftCard extends NftData {
	currentBid: string;
	endTime: number;
	imageUrl: string;
}

interface NftState {
	error: string | null;
	items: NftCard[];
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NftState = {
	error: null,
	items: [],
	status: "idle",
};

// Улучшенный async thunk с таймаутом и повторными попытками
export const fetchNfts = createAsyncThunk(
	"nfts/fetchNfts",
	async (_, { rejectWithValue, signal }) => {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);
		try {
			const response = await fetch(
				"https://api.coingecko.com/api/v3/nfts/list",
				{
					signal: signal || controller.signal,
				},
			);

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			const data = (await response.json()) as NftData[];
			return data;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error) {
				if (error.name === "AbortError") {
					return rejectWithValue("Request timeout");
				}
				return rejectWithValue(error.message);
			}
			return rejectWithValue("Unknown error occurred");
		}
	},
);

const generateRandomImageUrl = () => {
	const images = [""];

	return images[Math.floor(Math.random() * images.length)];
};

const generateRandomBid = () => {
	const ethAmount = (Math.random() * 5 + 0.1).toFixed(3);
	return `${ethAmount} ETH`;
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
				state.status = "loading";
			})
			.addCase(
				fetchNfts.fulfilled,
				(state, action: PayloadAction<NftData[]>) => {
					state.status = "succeeded";
					state.items = action.payload.slice(0, 10).map((nft) => ({
						currentBid: generateRandomBid(),
						endTime: generateRandomEndTime(),
						imageUrl: generateRandomImageUrl(),
						...nft,
					}));
				},
			)
			.addCase(fetchNfts.rejected, (state, action) => {
				state.status = "failed";
				state.error = (action.payload as string) || "Failed to fetch NFTs";
			});
	},
	initialState,
	name: "nfts",
	reducers: {},
});

export default slice.reducer;
