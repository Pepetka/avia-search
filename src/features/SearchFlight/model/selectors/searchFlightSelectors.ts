import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { SearchFlightSchema } from '../types/searchFlightSchema';
import { searchFieldsInitial } from '../const/searchFields';

export const getPage = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state.page ?? 1
);

export const getLimit = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state._limit ?? 10
);

export const getSearchFlightFields = createSelector(
	(state: StateSchema) => state.searchFlight,
	(state: SearchFlightSchema) => state.searchFields ?? searchFieldsInitial
);
