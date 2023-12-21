const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const app = express();
const path = require('path');

const config = require('config');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
const serverConfig = config.get('server');

const port = serverConfig.port;

require('dotenv').config()

app.use(cookieSession({
    name: 'cookie-session-name',
    keys: [process.env.COOKIE_ENCRYPTION_KEY]
}))

// register regenerate & save after the cookieSession middleware initialization
app.use(function (req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (callback) => {
            callback()
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (callback) => {
            callback()
        }
    }
    next()
})

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// DB

app.use('/static', express.static(path.join(__dirname, '../public')));


app.use('/', mainRouter);
app.use('/auth', usersRouter);


app.listen(port, () => {
    console.log(`Listening on ${port}`);
})