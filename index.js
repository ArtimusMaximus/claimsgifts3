import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import session from 'express-session';
import { User } from "/home/amiv/buildrestapinode/src/models/users";

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

app.get('/login/views', (req, res, next) => {
    if (req.session.views) {
        req.session.views ++
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>Views: ' + req.session.views + '</h1>')
        res.write('<h2>Expires in ' + (req.session.cookie.maxAge / 1000) + '</h2>')
        res.end()
    } else {
        req.session.views = 1
        res.end('session demo, refresh')
    }
})
// app.use((req, res, next) => {
//     if (!req.session.views) {
//         req.session.views = {}
//     }
//     let pathname = parseurl(req).pathname
//     req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
//     next()
// })
// app.get('/login', (req, res) => {
//     res.send('you requested this page ' + req.session.views['/login'] + ' time(s)')
// })


//body parser setup - middleware for parsing the body data
app.use(bodyParser.urlencoded({ extended: false })); //switch to false
app.use(bodyParser.json());


//routes from our controller
routes(app);

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
passport.deserializeUser(User.deserializeUser());







app.use((req, res, next) => {
    res.locals.user = req.user;
    console.log(res.locals.user);
    next();
})

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    res.send(`Node & Express running on PORT ${PORT}.`)
});

//template engine

app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard.ejs', {title: 'Dashboard', user: req.user.username})
})
app.get('/dashboard/:username', (req, res) => {
    res.send(req.params)
})

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret')
})

app.post('/contact', (req, res) => {
    console.log(req.body)
    res.send('app dot post used')
})
// app.post('/signup', (req, res) => {
//     res.send(req.body)
// })
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: 'login',
}), (req, res) => {
    res.send(req.body.authenticate)
})





function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}



//node authentication

app.listen(PORT, () => 
    console.log(`Your server is running on PORT ${PORT}.`)
);

export default User;
