import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const giftSchema = new Schema({
    gift: {
        type: String,
    },
    giftLink: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
export const giftS = mongoose.model('Nested', giftSchema)

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
})