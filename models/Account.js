import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    lovedOnes: {
        type: [String],
        default: []
    }
});

const Account = module.exports = mongoose.model('Account', AccountSchema);

module.exports.registerAccount = (newAccount, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAccount.password, salt, (err, hash)=> {
      // Store hash in your password DB.
      if (err) throw err;
      newAccount.password = hash;
      newAccount.save(callback);
    })
  });
};
