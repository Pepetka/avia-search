import { Request, Response } from 'express';
import db from '../database/database.ts';

interface Params extends Record<string, string | boolean | number> {
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

			const resFlights = flights
				.filter(
					({
						flight: {
							price: {
								total: { amount },
							},
							legs: [{ segments }],
						},
					}) =>
						((segments.length === 2 && filter === '1') ||
							filter === '2' ||
							(segments.length === 1 && filter === '0')) &&
						+amount >= +priceFrom &&
						+amount <= (+priceTo <= +priceFrom ? Infinity : +priceTo)
				)
				.filter(
					({
						flight: {
							carrier: { caption: currentCompany },
						},
					}) =>
						companiesArr.includes(currentCompany) || companiesArr.length === 0
				)
				.sort(
					(
						{
							flight: {
								price: {
									total: { amount: a },
								},
								legs: [{ duration: timeA }],
							},
						},
						{
							flight: {
								price: {
									total: { amount: b },
								},
								legs: [{ duration: timeB }],
							},
						}
					) =>
						sort === 'asc'
							? +a - +b
							: sort === 'time'
							? +timeA - +timeB
							: +b - +a
				)
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
