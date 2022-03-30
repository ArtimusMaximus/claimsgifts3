import { addNewContact,
        deleteContact,
        getContacts,
        getContactWithID,
        updateContact,
        createUser,
        removeUser,
        getUserByID,
        getUser,
        registerUser,
        updateEvent,
        createEvent,
        findEvent,
        addEventsToUser,
        getEventByName,
        insertGifts,
        addGiftz,
        updateUser,
        removeGift,
        getGift,
        getGift2,
        getGift3,
        getGiftById,
        deleteEventGifts,
        updateGiftClaimee,

} from '../controllers/crmController';

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getContacts)

        //Post endpoint
        .post(addNewContact);
        
    app.route('/contact/:contactID')
    // this is to get a specific contact
        .get(getContactWithID)

    //this is for updating a contact...etc.
        .put(updateContact)

        .delete(deleteContact)
    //this is for posting on the :contactID page
        // .post(addToGiftsList)

    app.route('/signup')
        
       .post(registerUser)

    // app.route('/dashboard/:event')

    //    .post(createEvent)

    //    .put(updateEvent)

    //    .get(getEventByName)

    app.route('/dashboard/:event')

        // .post(createEvent) 

        .get(getGift) // pulls existing gifts for event

        .delete(deleteEventGifts) // delete many,

    app.route('/dashboard/:userID/:event')

        .get(getGift)

    app.route('/dashboarduser/:userID')

        .get(getUserByID)

        .put(updateUser) //this updates our event list

    app.route('/dashboarduser/:username/:userID/:events1') 

        .post(addGiftz) // this works

        .get(getGift2) // getGift prior

    app.route('/dashboarduser/:user/:userID/:events1') 

        .post(addGiftz) // this works

        .get(getGift3) // getGift prior

    app.route('/dashboarduser/:giftID')

        .delete(removeGift) //delete works

        .get(getGiftById) //this does not work yet

    app.route('/dashboard/:giftID')
        
        .get(getGiftById) // I don't believe this works

        .put(updateGiftClaimee)

       
}

export default routes;