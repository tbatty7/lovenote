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

export default router;
