import { rtkApi } from '@/shared/api/rtkApi';
import { SearchFlightSchema } from '../../../../features/SearchFlights';

export interface StateSchema {
	searchFlight: SearchFlightSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
