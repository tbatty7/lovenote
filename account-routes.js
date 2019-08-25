import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import Account from './models/Account';

const router = express.Router();

// endpoint to create new user account
router.route('/account/create').post((req, res) => {
  let account = new Account(req.body);
  Account.registerAccount(account, (err, user) => {
    if (err) {
      res.status(400).send('Failed to create account');
    } else {
      res.status(200).json({'message': 'Account Created Successfully!'});
    }
  });
});

// endpoint to validate user account and retrieve it
router.route('/account/validate/:name/:password').get((req, res) => {
  let query = {name: req.params.name, password: req.params.password};
  Account.find(query, (err, account) => {
    if (err)
      console.log(err);
    else
      res.json(account);
  });
});

// endpoint to authenticate with jwt token
router.route('/account/authenticate').post((req, res, next) => {
  const username = req.body.name;
  const password = req.body.password;

  Account.findOne({name: username}, (err, account) => {
    if (err) throw err;
    if (!account) {
      return res.json({'success': false, 'msg': 'User not found'});
    }

    Account.comparePassword(password, account.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(account.toJSON(), process.env.MY_DATABASE_SECRET, {
          'expiresIn': 28800 // 8 hours worth of seconds
        });
        res.json({
          'success': true,
          'token': 'JWT ' + token,
          'account': {
            'id': account._id,
            'name': account.name,
            'lovedOnes': account.lovedOnes
          }
        });
      } else {
        return res.json({'success': false, 'msg': 'Wrong password'});
      }
    });

  });

});

// endpoint to get user account by id
router.get('/account/get/:id', passport.authenticate('jwt', {'session':false}),(req, res) => {
  Account.findById(req.params.id, (err, account) => {
    if (err)
      console.log(err);
    else
      res.json(account);
  });
});

//endpoint to return true or false if account exists
router.route('/account/exists/:name').get((req, res) => {
  let query = {name: req.params.name};
  Account.find(query, (err, account) => {
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
