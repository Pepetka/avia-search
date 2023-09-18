import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'flights.json');

interface Database {
	result: {
		flights: any[]
	}
}

const adapter = new JSONFile<Database>(file);
const defaultData: Database = {
	result: {
		flights: []
	}
};
const db = new Low<Database>(adapter, defaultData);

export default db;
