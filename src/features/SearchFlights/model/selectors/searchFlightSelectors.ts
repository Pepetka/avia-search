import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { SearchFlightSchema } from '../types/searchFlightSchema';
import { initialState } from '../slice/searchFlightSlice';

export const getPage = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state.page ?? initialState.page
);

export const getLimit = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state._limit ?? initialState._limit
);

export const getSearchFlightFields = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state.searchFields ?? initialState.searchFields
);
