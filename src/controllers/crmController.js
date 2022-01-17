import res from 'express/lib/response';
import mongoose from 'mongoose';
import { ContactSchema, giftSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);
const giftS = mongoose.model('Nested', giftSchema)

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
        console.log('Post received')
    })
}
//this is for posting when on a gifts ID /contact/:contactID
// export const addToGiftsList = (req, res) => {
//     let embedContact = new giftS(req.body);

//     embedContact.save((err, contact) => { 
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact)
//         console.log('Embedded Post received.');
//     })
// }

export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactID, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true, useFindAndModify: false }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactID }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfully deleted contact' });
    });
}