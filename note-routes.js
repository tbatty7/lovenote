import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import Note from './models/Note';

const router = express.Router();

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
  let query = {recipient: req.body.name};
  Note.find(query, (err, notes) => {
    if (err)
      console.log(err);
    else
      res.json({notes: notes});
  });
});

router.route('/note/authored').post((req, res) => {
  let query = {author: req.body.name};
  Note.find(query, (err, notes) => {
    if (err)
      console.log(err);
    else
      res.json({notes: notes});
  });
});

router.route('/note/delete/:id').get((req, res) => {
  let query = {_id: req.params.id};
  Note.findByIdAndRemove(query, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});


export default router;
