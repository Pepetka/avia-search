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
			const { limit, page, ...searchFlightFields } = req.query;

			console.log(searchFlightFields);

			await db.read();
			const {
				result: { flights },
			} = db.data;

			return res.json(
				flights
					.filter(
						({
							flight: {
								price: {
									total: { amount },
								},
								legs: [{ segments }],
							},
						}) =>
							((segments.length === 2 && searchFlightFields.filter === '1') ||
								searchFlightFields.filter === '2' ||
								(segments.length === 1 && searchFlightFields.filter === '0')) &&
							+amount >= +searchFlightFields.priceFrom &&
							+amount <=
								(+searchFlightFields.priceTo <= +searchFlightFields.priceFrom
									? Infinity
									: +searchFlightFields.priceTo)
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
							searchFlightFields.sort === 'asc'
								? +a - +b
								: searchFlightFields.sort === 'time'
								? +timeA - +timeB
								: +b - +a
					)
					.slice(0, +limit * +page)
			);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: `Server error: ${e}` });
		}
	}
}
