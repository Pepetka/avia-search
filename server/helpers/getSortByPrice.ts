import { FlightResponse } from '../../src/shared/types/Flights.ts';

export const getSortByPrice =
	(sort: 'asc' | 'desc') =>
	(
		{
			flight: {
				price: {
					total: { amount: a },
				},
			},
		}: FlightResponse,
		{
			flight: {
				price: {
					total: { amount: b },
				},
			},
		}: FlightResponse
	) => {
		if (sort === 'asc') {
			return +a - +b;
		} else {
			return +b - +a;
		}
	};
