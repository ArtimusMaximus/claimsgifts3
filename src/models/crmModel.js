import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    company: {
        type:  String,
        required: 'Company'
    },
    phone: {
        type: Number,
        required: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})