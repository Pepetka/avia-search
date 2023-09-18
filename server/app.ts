import express from 'express';
import AppConfig from './config/app.ts';

const app = express();
const server = new AppConfig(app);
server.initializeApp(app);

export default server;
