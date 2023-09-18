import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { FlightResponse } from '../../src/shared/types/Flights.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'flights.json');

interface Database {
	result: {
		flights: FlightResponse[];
	};
}

const adapter = new JSONFile<Database>(file);
const defaultData: Database = {
	result: {
		flights: [],
	},
};
const db = new Low<Database>(adapter, defaultData);

export default db;
