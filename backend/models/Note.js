import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Note = new Schema({
   category: {
       type: String
   },
   author: {
       type: String
   },
   receipient: {
       type: String
   },
   message: {
       type: String
   }
});

export default mongoose.model('Note', Note);
