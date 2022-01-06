import { addNewContact,
        deleteContact,
        getContacts,
        getContactWithID,
        updateContact,

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
}

export default routes;