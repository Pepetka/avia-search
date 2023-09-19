import { FlightResponse } from '../../src/shared/types/Flights.ts';
import { Params } from '../controllers/controller.ts';

export const getFilterByTransfersNum =
	(filter: Params['filter']) =>
	({
		flight: {
			legs: [{ segments }],
		},
	}: FlightResponse) =>
		(segments.length === 2 && filter === '1') ||
		filter === '2' ||
		(segments.length === 1 && filter === '0');
