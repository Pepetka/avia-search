import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { searchFlightReducer } from '../../../features/SearchFlights';
import { StateSchema } from './types/StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		searchFlight: searchFlightReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(rtkApi.middleware),
	});

	return store;
};
