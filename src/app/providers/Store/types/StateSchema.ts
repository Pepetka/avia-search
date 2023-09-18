import { rtkApi } from '@/shared/api/rtkApi';
import { SearchFlightSchema } from '@/features/SearchFlight';

export interface StateSchema {
	searchFlight: SearchFlightSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
