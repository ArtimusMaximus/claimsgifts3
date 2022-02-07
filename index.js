import express from 'express';
import routes from './src/routes/crmRoutes';
import path from 'path'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import session from 'express-session';
import { User, Event } from "/home/amiv/buildrestapinode/src/models/users";

const app = express();
const PORT = 4000;
const router = express.Router();


//passport config



//mongoose connection/////
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// const Schema = mongoose.Schema;
// let NewUser1 = new Schema({
//     username: String,
//     password: String
// });
// NewUser1.plugin(passportLocalMongoose);
// const User = mongoose.model('User', NewUser1)
/////////////////////////

// serving static files
app.use(express.static('public'));



//body parser setup - middleware for parsing the body data
app.use(bodyParser.urlencoded({ extended: false })); //switch to false
app.use(bodyParser.json());


//routes from our controller


//routes from our router

app.use(session({ 
    secret: "cats",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.serializeUser(Event.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(Event.deserializeUser());









//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    res.send(`Node & Express running on PORT ${PORT}.`)
});

//template engine
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     res.locals.email = req.user
//     res.locals.filter = req.body.filter
//     console.log('res.locals.user in index app.use: ', res.locals);
//     next();
// })

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret')
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/dashboarduser/events', isLoggedIn, (req, res) => {
    res.render('existingevents', {user: req.user.username})
})

// app.get('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err){ return next(err) }
//         if(!user){ return res.redirect('/login') }
//         req.logIn(user, (err) => {
//             if(err){ return next(err) }
//             return res.redirect('/dashboard/' + user.username)
//         });
//     })(req, res, next);
//     res.render('/login')
// });


// app.post('/signup', (req, res) => {
//     res.send(req.body)
// })

app.get(`/dashboarduser`, isLoggedIn,  (req, res,) => {
    res.render('dashboarduser', {title: 'Dashboard', user: req.user.username, events1: req.user.events1, userID: req.user._id})
    // res.setHeader("Content-Type", "text/javascript")
})
app.get(`/dashboarduser/:username/:events1`, isLoggedIn, (req, res) => {    //get this working at some point
    // res.setHeader("Content-Type", "text/html")
    res.render('gifts', {user: req.user.username, events1: req.user.events1, eventname: req.params.events1})
    console.log("req.user: " + req.user.username);
})


app.post('/contact', (req, res) => {
    console.log(req.body)
    res.send('app dot post used')
})


app.post('/login', passport.authenticate('local', {
    // successRedirect: `/dashboarduser`,
    failureRedirect: '/login',
    failureFlash: true,
}), (req, res) => {
    res.redirect('/dashboarduser')// + req.user.username)
    console.log('req.user.events from app.post/login : ' + req.user.events);
});






app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})


function isLoggedIn(req, res, next) {
    if(req.user){
        return next();
    } 
    res.redirect('/login')
}

routes(app); //when this was up top, it was running before the other items (authentication mainly) were able to happen on user creation

//node authentication

app.listen(PORT, () => 
    console.log(`Your server is running on PORT ${PORT}.`)
);

export default User; 
