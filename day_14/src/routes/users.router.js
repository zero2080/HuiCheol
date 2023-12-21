const express = require('express');
const passport = require('passport');
const User = require('../models').users;
const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({ msg: info });
        }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        })
    })(req, res, next)
})

usersRouter.post('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    })
})

usersRouter.post('/signup', async (req, res) => {
    // user 객체를 생성합니다. 
    const user = {email:req.body.email,password:req.body.password};
    try {
        await User.create(user);
        res.redirect('/login');
    } catch (error) {
        console.error(error);
    }
})

usersRouter.get('/google', passport.authenticate('google'));

usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

usersRouter.get('/kakao', passport.authenticate('kakao'));

usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));


module.exports = usersRouter;