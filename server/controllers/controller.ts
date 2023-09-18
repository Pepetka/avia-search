import { Request, Response } from 'express';
import db from "../database/database.ts";

export default class Controller {
	async getFlights(_: Request, res: Response) {
		try {
			await db.read()
			const { result: { flights } } = db.data;

			return res.json(flights);
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: `Server error: ${e}` })
		}
	}
}
