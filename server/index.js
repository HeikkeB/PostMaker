import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import routerAuth from './routes/auth.js';
import router from './routes/index.js';
import { limiter } from './middleware/limiter.js';
import handleErrors from './middleware/handleErrors.js';

const app = express();
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.static('build'));
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p8tssia.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
);
app.use(helmet(
  {
    crossOriginResourcePolicy: false,
  },
));
app.use(limiter);
app.use(routerAuth);
app.use(router);
app.use(errors());
app.use(handleErrors);

export default app;
