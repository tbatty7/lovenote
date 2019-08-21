import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import Account from './models/Account';
import Note from './models/Note';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/frontend'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
// });

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

//endpoint to return true or false if account exists
router.route('/account/exists/:name').get((req, res) => {
    Account.find({name: req.params.name}, (err, account) => {
        if (err)
            console.log(err);
        else
            res.json({'exists': (account.length > 0)});
    });
});

// endpoint to add loved ones to an account
router.route('/account/add-loved-one').post((req, res) => {
    Account.findById(req.body.id, (err, account) => {
        if (err)
            console.log(err);
        else if (!account)
            return next(new Error('Could not load document'));
        else {
            console.log('received request to add: ' + req.body.lovedOne);
            account.lovedOnes.push(req.body.lovedOne);
            account.markModified('lovedOnes'); // This is neccesary for Mongoose to know an array was modified so it saves it.
            account.save()
                .then(() => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    });
});

// endpoint to create a new love note
router.route('/note/create').post((req, res) => {
    let note = new Note(req.body);
    note.save()
        .then(note => {
            res.status(200).json({'message': 'Note Created!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create note');
        });
});

router.route('/note/received').post((req,res) => {
    Note.find({recipient: req.body.name}, (err, notes) => {
        if (err)
            console.log(err);
        else
            res.json({notes: notes});
    });
});

router.route('/note/authored').post((req, res) => {
    Note.find({author: req.body.name}, (err, notes) => {
        if (err)
            console.log(err);
        else
            res.json({notes: notes});
    });
});

router.route('/note/delete/:id').get((req, res) => {
    Note.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(process.env.PORT || 4000, () => console.log('Express server is running on port 4000'));
