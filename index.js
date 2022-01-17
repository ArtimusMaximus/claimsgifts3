import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import res from 'express/lib/response';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import { Db } from 'mongodb';

const app = express();
const PORT = 4000;
const router = express.Router();


//passport config
// passport.use(new LocalStrategy (function verify(username, password, cb) {
//     Db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) { //this will need to be a mongodb schema
//         if (err) { return cb(err); }
//         if (!user) { return cb(null, false, { message: "Incorrect username or pass" }); }

//         crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//             if (err) { return cb(err); }
//             if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//                 return cb(null, false, { message: 'Incorrect username of pass' });
//             }
//             return cb(null, user);
//         });
//     });
// }));





//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//body parser setup - middleware for parsing the body data

app.use(bodyParser.urlencoded({ extended: false })); //switch to false
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'))

// router.get('/', (req, res) => {
//     res.sendFile('index.html')
// })
// router.post('/', (req, res) => {
//     res.sendFile('index.html')
// })

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
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})

app.post('/contact', (req, res) => {
    console.log(req.body)
    res.send('app dot post used')
})

//node authentication
app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    res.send(`Username ${username} password ${password}`)
})

app.listen(PORT, () => 
    console.log(`Your server is running on PORT ${PORT}.`)
);


