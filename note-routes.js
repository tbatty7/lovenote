import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import Note from './models/Note';

const router = express.Router();

// endpoint to create a new love note
router.post('/note/create',
  passport.authenticate('jwt', {'session':false}),
  (req, res) => {
  let note = new Note(req.body);
  note.save()
    .then(note => {
      res.status(200).json({'message': 'Note Created!'});
    })
    .catch(err => {
      res.status(400).send('Failed to create note');
    });
});

router.post('/note/received',
  passport.authenticate('jwt', {'session':false}),
  (req,res) => {
  let query = {recipient: req.body.name};
  Note.find(query, (err, notes) => {
    if (err)
      console.log(err);
    else
      res.json({notes: notes});
  });
});

router.post('/note/authored',
  passport.authenticate('jwt', {'session':false}),
  (req, res) => {
  let query = {author: req.body.name};
  Note.find(query, (err, notes) => {
    if (err)
      console.log(err);
    else
      res.json({notes: notes});
  });
});

router.get('/note/delete/:id',
  passport.authenticate('jwt', {'session':false}),
  (req, res) => {
  let query = {_id: req.params.id};
  Note.findByIdAndRemove(query, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});


export default router;
