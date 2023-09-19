import { FlightResponse } from '../../src/shared/types/Flights.ts';

export const getFilterByCompanies =
	(companies: string[]) =>
	({
		flight: {
			carrier: { caption: currentCompany },
		},
	}: FlightResponse) =>
		companies.includes(currentCompany) || companies.length === 0;
