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
    gname: [String],
});

let eventSchema = new Schema({
    event: { type : [String] } , 
    name: { type: [String] } , 
    link: { type : [String] },
    all: [{ event: [String], giftName: [giftSchema], giftLink: [String]}]
})



let NewUser1 = new Schema({
    email: { type: String, required: false },
    username: { type: String, required: false },
    events: { type: [String], required: false }, //Array
    giftsss: [eventSchema],
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