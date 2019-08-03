import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Account = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    lovedOnes: {
        type: [String],
        default: null
    }
});

export default mongoose.model('Account', Account);
