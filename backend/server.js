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
    });
});

// endpoint to get user account by id
router.route('/account/get/:id').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err)
            console.log(err);
        else
            res.json(account);
    });
});

// endpoint to add loved ones to an account
router.route('/account/add-loved-one/:id').get((req, res) => {
    Account.findById(req,params.id, (err, account) => {
        if (err)
            console.log(err);
        else if (!issue)
            return next(new Error('Could not load document'));
        else {
            account.lovedOnes.put(req.body.lovedOne);
            account.save().then((account) => {
                res.json('Loved One Added');
            }).catch(err => {
                res.status(400).send('Update Failed');
            });
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));
