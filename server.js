import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import Note from './models/Note';
import accountRoutes from './account-routes';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/frontend'));
app.use('/', accountRoutes);
app.use('/', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

mongoose.connect(process.env.MY_DATABASE_URL);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
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
