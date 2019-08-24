import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import Account from './models/Account';
import Note from './models/Note';

const app = express();
const router = express.Router();

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


export default router;
