import { Request, Response } from 'express';
import db from '../database/database.ts';
import { getFilterByTransfersNum } from '../helpers/getFilterByTransfersNum.ts';
import { getFilterByPrice } from '../helpers/getFilterByPrice.ts';
import { getFilterByCompanies } from '../helpers/getFilterByCompanies.ts';
import { getSortByDuration } from '../helpers/getSortByDuration.ts';
import { getSortByPrice } from '../helpers/getSortByPrice.ts';

export interface Params extends Record<string, string | boolean | number> {
	page: number;
	limit: number;
	sort: 'asc' | 'desc' | 'time';
	filter: '0' | '1' | '2';
	priceFrom: string;
	priceTo: string;
}

export default class Controller {
	async getFlights(req: Request<void, void, void, Params>, res: Response) {
		try {
			const { limit, page, filter, priceFrom, priceTo, sort, ...companies } =
				req.query;
			const companiesArr = Object.keys(companies);

			await db.read();
			const {
				result: { flights },
			} = db.data;

			const filterByTransfersNum = getFilterByTransfersNum(filter);
			const filterByPrice = getFilterByPrice(priceFrom, priceTo);
			const filterByCompanies = getFilterByCompanies(companiesArr);

			const sortByTimeOrPrice =
				sort === 'time' ? getSortByDuration() : getSortByPrice(sort);

			const resFlights = flights
				.filter(
					(flight) =>
						filterByTransfersNum(flight) &&
						filterByPrice(flight) &&
						filterByCompanies(flight)
				)
				.sort((prev, curr) => sortByTimeOrPrice(prev, curr))
				.slice(+limit * (+page - 1), +limit * +page);

			return res.json({
				flights: resFlights,
				endReached: resFlights.length < limit,
			});
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: `Server error: ${e}` });
		}
	}

	async getCompaniesFilters(_: Request, res: Response) {
		try {
			await db.read();
			const {
				result: { flights },
			} = db.data;

			const companiesFilters: Record<string, number> = {};

			flights.forEach(
				({
					flight: {
						price: {
							total: { amount: totalPrice },
						},
						carrier: { caption: company },
					},
				}) => {
					companiesFilters[company] = companiesFilters[company]
						? Math.min(+companiesFilters[company], +totalPrice)
						: +totalPrice;
				}
			);

			return res.json({ companiesFilters });
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: `Server error: ${e}` });
		}
	}
}
