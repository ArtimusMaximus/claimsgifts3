import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

const Schema = mongoose.Schema;

export const giftSchema = new Schema({
    gift: String,
    giftlink: String,
})
// export const giftS = mongoose.model('Nested', giftSchema)



export const NewUserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    events: String,

    gifts: [giftSchema]

});

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        // required: 'Enter a first name'
    },
    lastName: {
        type: String,
        // required: 'Enter a last name'
    },
    email: {
        type: String,
        //required: 'Enter an email'
    },
    company: giftSchema
        //required: 'Company'
    ,
    phone: {
        type: Number,
        //required: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});



NewUserSchema.plugin(passportLocalMongoose);

const NewUser = mongoose.model('NewUser', NewUserSchema);

export default NewUser;