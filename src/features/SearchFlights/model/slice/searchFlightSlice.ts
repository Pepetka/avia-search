import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchFields } from '@/shared/types/search.ts';
import { SearchFlightSchema } from '../types/searchFlightSchema';
import { searchFieldsInitial } from '../const/searchFields';

export const initialState: SearchFlightSchema = {
	page: 1,
	_limit: 10,

	searchFields: searchFieldsInitial,
};

export const searchFlightSlice = createSlice({
	name: 'searchFlight',
	initialState,
	reducers: {
		setPage: (state, { payload }: PayloadAction<number | undefined>) => {
			state.page = payload ?? state.page + 1;
		},
		setSearchFields: (state, { payload }: PayloadAction<SearchFields>) => {
			state.searchFields = payload;
		},
	},
});

export const { actions: searchFlightActions, reducer: searchFlightReducer } =
	searchFlightSlice;
