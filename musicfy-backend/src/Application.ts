import express from 'express';
import cors from 'cors';
import { appConfiguration } from './Config';

import albumRouter from './Routes/Album.routes';
import songRouter from './Routes/Song.routes';

const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/album', albumRouter);
app.use('/song', songRouter);

export default app;
