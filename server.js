import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import jwtStrategy from './config/passport';

import accountRoutes from './account-routes';
import noteRoutes from './note-routes';

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/dist/frontend')); // This must be in front of routes
app.use(bodyParser.json());

app.use('/', accountRoutes);
app.use('/', noteRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

mongoose.connect(process.env.MY_DATABASE_URL);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// Mongo mLab
// {
//   "_id": "lovenote.notewriter",
//   "user": "notewriter",
//   "db": "lovenote",
//   "roles": [
//   {
//     "role": "dbOwner",
//     "db": "lovenote"
//   }
// ]
// }

const server = app.listen(process.env.PORT || 5000, () => console.log('Express server is running on port -' + process.env.PORT + '- or port 5000'));


process.on('SIGTERM', code => {
  console.log('Shutting down with SIGTERM, code: ' + code);
  server.close();
});

process.on('SIGINT', code => {
  console.log('Shutting down with SIGINT, code: ' + code);
  server.close();
});

process.on('uncaughtException', code => {
  console.log('Shutting down with uncaught exception of: ' + code);
  server.close();
});
