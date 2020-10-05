import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import corsOptions from '$root/middleware/cors';
import * as passportStrategies from '$root/middleware/passport';
import router from '$root/router';
import { handleResponseError } from '$root/utils/handlers';

console.log('\x1b[36m%s\x1b[0m', 'Starting API application...');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Object.keys(passportStrategies).forEach(strategy => passport.use(passportStrategies[strategy]));
app.use(passport.initialize());
app.use(passport.session());

app.use('/downloads', express.static('./uploads'));
app.use('/', router);
app.use(handleResponseError);

const options = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_URI, options).then(() => app.listen(Number(process.env.PORT)));

console.log('\x1b[36m%s\x1b[0m', `API application started on ${process.env.API_DOMAIN}`);
