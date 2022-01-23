import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// mongoose.connect('mongodb://localhost/users', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const Schema = new mongoose.Schema;

// export const UserSchema = new Schema({
//     username: String,
//     password: String
// });

// User.plugin(passportLocalMongoose);





const Schema = mongoose.Schema;
let NewUser1 = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true }
});
NewUser1.plugin(passportLocalMongoose);
export const User = mongoose.model('User', NewUser1)
