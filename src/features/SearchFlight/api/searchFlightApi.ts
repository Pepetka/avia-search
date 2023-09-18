import { rtkApi } from '@/shared/api/rtkApi';
import { FlightResponse } from '@/shared/types/Flights';
import { SearchFields } from '@/shared/types/search';

type Response = FlightResponse[];

interface ISearchFlightApiArgs {
	page: number;
	limit: number;
	searchFlightFields: SearchFields;
}

interface ReqParams extends Record<string, string | boolean | number> {
	page: number;
	limit: number;
	sort: 'asc' | 'desc' | 'time';
	filter: '0' | '1' | '2';
	priceFrom: string;
	priceTo: string;
}

export const searchFlightsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchFlightsData: build.query<Response, ISearchFlightApiArgs>({
			query: ({ page, limit, searchFlightFields }) => {
				const reqParams: ReqParams = {
					...searchFlightFields.companies.reduce(
						(acc, curr) => ({
							...acc,
							[curr]: true,
						}),
						{}
					),
					page,
					limit,
					sort: searchFlightFields.sort,
					filter:
						searchFlightFields.filter.length === 2 ||
						searchFlightFields.filter.length === 0
							? '2'
							: searchFlightFields.filter.includes('0transfer')
							? '0'
							: '1',
					priceFrom: searchFlightFields.price[0],
					priceTo: searchFlightFields.price[1],
				};

				return {
					method: 'Get',
					url: `/flights`,
					params: reqParams,
				};
			},
		}),
	}),
});

export const { useFetchFlightsDataQuery } = searchFlightsApi;
