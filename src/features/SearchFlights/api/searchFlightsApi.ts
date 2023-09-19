import { rtkApi } from '@/shared/api/rtkApi';
import { FlightResponse } from '@/shared/types/Flights';
import { SearchFields } from '@/shared/types/search';

type Response = {
	flights: FlightResponse[];
	endReached: boolean;
};

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
		getCompaniesFilters: build.query<
			{ companiesFilters: Record<string, number> },
			void
		>({
			query: () => ({
				method: 'Get',
				url: '/getFilters',
			}),
		}),
		fetchFlightsData: build.query<Response, ISearchFlightApiArgs>({
			query: ({ page, limit, searchFlightFields }) => {
				// Подготовка параметров для отправки
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
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return endpointName + JSON.stringify(queryArgs.searchFlightFields);
			},
			merge: (currentData, responseData) => {
				// Добавление новых данных к существующим
				if (responseData.flights?.length) {
					currentData.flights.push(...responseData.flights);
				}
				currentData.endReached = responseData.endReached;
			},
			forceRefetch: ({ currentArg, previousArg }) => {
				// Изменение страницы вызывает запрос
				return currentArg?.page !== previousArg?.page;
			},
		}),
	}),
});

export const { useFetchFlightsDataQuery, useGetCompaniesFiltersQuery } =
	searchFlightsApi;
