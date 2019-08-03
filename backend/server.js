import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Account from './models/Account';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/lovenote');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});



app.use('/', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));
