import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import router from './routes/index.js';
import { limiter } from './middleware/limiter.js';

const app = express();
dotenv.config();

//  Constants
const PORT = process.env.PORT || 5001;

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.static('build'));
app.use(helmet());
app.use(limiter);
app.use(router);
app.use('/', ((req, res) => {
  res.redirect('/auth/me');
}));

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p8tssia.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    );

    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

start();
