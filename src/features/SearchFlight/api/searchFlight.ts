import { rtkApi } from '@/shared/api/rtkApi';

type Response = any[]

interface ISearchFlightApiArgs {}

export const searchFlightsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchFlightsData: build.query<Response, ISearchFlightApiArgs>({
			query: () => ({
				method: 'Get',
				url: `/flights`,
			}),
		}),
	}),
});

export const { useFetchFlightsDataQuery } = searchFlightsApi;
