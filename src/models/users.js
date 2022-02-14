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

let giftSchema = new Schema({
    giftx: String,
    giftLinkx: String,
    event: String,
    username: String

});

let eventSchema = new Schema({
    event: [String],
    day: { type: Date },
    username: String
})



let NewUser1 = new Schema({
    email: { type: String, required: false },
    username: { type: String, required: false },
    events1: [String],
});

// NewUser1.methods.findSimilarType = function findSimilarType (cb) {
//     return this.model('User').find({ type: this.type }, cb)
// }


NewUser1.plugin(passportLocalMongoose);
eventSchema.plugin(passportLocalMongoose);
giftSchema.plugin(passportLocalMongoose);
export const User = mongoose.model('User', NewUser1, 'users')
export const Event = mongoose.model('Event', eventSchema, 'users')
export const Gift = mongoose.model('Gift', giftSchema, 'users')