import { FlightResponse } from '../../src/shared/types/Flights.ts';

export const getSortByDuration =
	() =>
	(
		{
			flight: {
				legs: [{ duration: timeA }],
			},
		}: FlightResponse,
		{
			flight: {
				legs: [{ duration: timeB }],
			},
		}: FlightResponse
	) =>
		+timeA - +timeB;
