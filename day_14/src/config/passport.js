const passport = require('passport');
const User = require('../models').users;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy

// req.login(user)
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// client => session => request 
passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            done(null, user);
        })
})


const localStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {

        User.findOne({
            where:{
                email: email.toLocaleLowerCase()
            }
        }).then(user => {
            if (!user) {
                return done(null, false, { msg: `Email ${email} not found` });
            }
            if(user.validPassword(password)) {
                return done(null, user);
            }else{
                return done(null, false, { msg: 'Invalid email or password.' });
            }
        })
    }
)
passport.use('local', localStrategyConfig);



const googleStrategyConfig = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({where:{ googleId: profile.id }})
    .then( existingUser => {
        if (existingUser) {
            return done(null, existingUser);
        } else {
            const user = {};
            user.email = profile.emails[0].value;
            user.googleId = profile.id;
            User.create(user)
            .then(user=>{
                done(null, user);
            })
            .catch(err => {
                console.log(err);
                if (err) { return done(err); }
            })
        }
    })
})

passport.use('google', googleStrategyConfig);


const kakaoStrategyConfig = new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: '/auth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({where:{ kakaoId: profile.id }})
    .then(existingUser => {
        if (existingUser) {
            return done(null, existingUser);
        } else {
            const user = {};
            user.kakaoId = profile.id;
            user.email = profile._json.kakao_account.email;
            User.create(user)
            .then(user=>{
                done(null,user);
            })
            .catch((err) => {
                if (err) { return done(err); }
                done(null, user);
            })
        }
    })
})

passport.use('kakao', kakaoStrategyConfig);