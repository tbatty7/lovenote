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

// endpoint to create new user account
router.route('/account/create').post((req, res) => {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.status(200).json({'message': 'Account Created Successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create account');
        });
});

// endpoint to validate user account and retrieve it
router.route('/account/validate/:name/:password').get((req, res) => {
    Account.find({name: req.params.name, password: req.params.password},(err, account) => {
        if (err)
            console.log(err);
        else
            res.json(account);
    })
});

app.use('/', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));
