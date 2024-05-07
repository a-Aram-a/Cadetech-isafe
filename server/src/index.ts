import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import CONFIG from './config';
import initErrors from './libraries/errors';
import { connectDB } from './libraries/db';
import initAuth from './components/auth';
import { jwtMiddleware } from './libraries/auth/middlewares';
import initMeters from './components/meters';

const app: Express = express();

app.use(cookieParser());
app.use(express.json());

// init components & libraries
connectDB()
initAuth(app);
initMeters(app);

const PORT = CONFIG.PORT;

app.get('/', jwtMiddleware, (req: Request, res: Response) => {
    res.send('Hello, this is Express + TypeScript');
});

app.listen(PORT, () => {
    console.log(`[Server]: Running at ${PORT} port`);
});

initErrors(app); // error handler should be last