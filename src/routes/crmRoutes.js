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

    app.route('/dashboarduser')

        .post(createEvent)

        .get(getEventByName)

    app.route('/dashboarduser/:userID')

        .get(getUserByID)

        .put(updateUser)

        .post(addGiftz)

    app.route('/dashboard/:event')

        .post(createEvent)

        .put(updateEvent)

        .get(getEventByName)

    app.route('/dashboarduser/:username/:events1')

        .post(addGiftz)

       
}

export default routes;