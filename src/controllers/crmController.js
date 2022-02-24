import res from 'express/lib/response';
import mongoose from 'mongoose';
import passport from 'passport';
import { ContactSchema, giftSchema, NewUserSchema } from '../models/crmModel';
import { User, Event, Gift } from "/home/amiv/projects/claimsgifts2/src/models/users";

const Contact = mongoose.model('Contact', ContactSchema);
const giftS = mongoose.model('Nested', giftSchema)
// const NewUser = mongoose.model('NewUser', User) - mistake :)


export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
        console.log('Post received')
    });
}

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
    Contact.deleteOne({ _id: req.params.contactID }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfully deleted contact' });
    });
}

//creating user logins

export const createUser = (req, res) => {
    let addUser = new User(req.body);
    
    addUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
        console.log(`user ${user} added`, typeof(user))
    })
}

export const getUserByID = (req, res) => {
    User.findById(req.params.userID, (err, user) => {
        if (err){
            res.send(err)
        }
        res.json(user);
    });
}

export const removeUser = (req, res) => {
    User.deleteOne({ _id: req.params.userID }, (err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json({message: 'contact deleted'})
    })
}

export const getUser = (req, res) => {
    User.find({username: req.body.username}, (err, username) => {
        if (err) {
            res.send(err)
        }
        res.json(username)
    })
}

export const registerUser = (req, res) => {
    User.register(
        new User({ username: req.body.username, email: req.body.email }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log('registerUser error handler: ', err);
                return res.render('/signup')
            }
            console.log('regiserUser user console log: ', user);
            passport.authenticate('local')(req, res, () => {
                res.redirect('/dashboarduser')// + req.user.username)
            })
        }
    )
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true }, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    });
}


export const addEventsToUser = ((req, res) => {
    User.insertMany({event: req.body.event}, (err, arr) => {
        if(err){
            res.send(err)
        }
        res.json(arr)  
    })  
})

export const getEventByName = (req, res) => {
    Event.findOne({username: req.params.username}, (err, user) => {
        if (err){
            res.send(err)
        }
        res.json(user);
        console.log('request for use by username: ' + user)
    });
}

export const createEvent = (req, res) => {
    let addEvent = new Event(req.body);
    addEvent.save((err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
        console.log(`Event ${event} added`, typeof(event))
    })
}

export const insertGifts = (req, res) => {
    const event = new Event(req.body);
    event.save((err, gname) => {
        if(err) {
            res.send(err);
        }
        res.json(gname)
    })
}

export const addGiftz = (req, res) => {
    const giftz = new Gift(req.body)
    giftz.save((err, gift) => {
        if(err){
            res.send(err)
        }
        res.json(gift)
    })
}

export const updateEvent = ((req, res) => {
    Event.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, ((err, event) => {
        if(err){
            res.send(err)
        }
        res.json(event)
    }))
})

export const removeGift = ((req, res) => {
    Gift.deleteOne({_id: req.params.giftID}, (err, user) => {
        if(err){
            res.send(err)
        }
        res.json({message: `${user} deleted`})
    })
})

export const getGift = ((req, res) => {
    Gift.find({event: req.params.event}, (err, user) => {
        if(err){
            res.send(err)
        }
        res.json(user)
    })
})

export const getGift2 = ((req, res) => {
    Gift.find({event: req.params.events1}, (err, user) => {
        if(err){
            res.send(err)
        }
        res.json(user)
    })
})

export const getGiftById = (req, res) => {
    Gift.findById(req.params.giftID, (err, gift) => {
        if(err){
            res.send(err)
        }
        res.json(gift)
    })
}

export const deleteEventGifts = ((req, res) => {
    Gift.deleteMany({event: req.params.event}, (err, event) => {
        if(err){
            res.send(err)
        }
        res.send({message: `all items related to ${event} have been deleted`})
    })
})

export const updateGiftClaimee = ((req, res) => {
    Gift.findOneAndUpdate({_id: req.params.giftID}, req.body, {new: true}, ((err, claimee) => {
        if(err){
            res.send(err)
        }
        res.json(claimee)
    }))
})