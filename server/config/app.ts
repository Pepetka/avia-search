import http from 'http';
import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../router/express.ts';

class AppConfig {
	server:  http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

	constructor(app: Express) {
		this.server = http.createServer(app);
	}

	initializeApp(app: Express) {
		dotenv.config();
		app.use(cors());
		app.use(express.json());
		app.use('/api', router);
	}

	listen(port: number) {
		this.server.listen(port, () => {
			console.log(`server is running on ${port} port`);
		});
	}
}

export default AppConfig;
