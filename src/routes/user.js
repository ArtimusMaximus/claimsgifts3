import express from 'express';
import passport from 'passport';
import { User } from '../models/users'


const router = express.Router()

router.post('/signup', (req, res) => {
    let Users = new User({email: req.body.email, username: req.body.username});
        User.register(Users, req.body.password, (err, user) => {
            if (err){
                req.flash('error', err.message);
                return res.render('/login')
            }

            passport.authenticate('local')(req, res, function() {
                req.flash('success', user.username)
                res.render('/dashboard')
            });
            console.log(user)
        });
});

export default router;