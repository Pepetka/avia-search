import { FlightResponse } from '../../src/shared/types/Flights.ts';
import { Params } from '../controllers/controller.ts';

export const getFilterByPrice =
	(priceFrom: Params['priceFrom'], priceTo: Params['priceTo']) =>
	({
		flight: {
			price: {
				total: { amount },
			},
		},
	}: FlightResponse) =>
		+amount >= +priceFrom &&
		+amount <= (+priceTo <= +priceFrom ? Infinity : +priceTo);
