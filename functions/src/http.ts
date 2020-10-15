import * as express from 'express';
import * as cors from 'cors';
import { validateFirebaseIdTokenMiddleware}  from './core/auth';

const app = express();

app.use(cors({origin: true}));
app.use(validateFirebaseIdTokenMiddleware);
app.options('*', cors());
