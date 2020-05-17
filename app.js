const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


require('dotenv').config();
console.log(process.env.NODE_ENV)

const compression = require('compression');
const helmet = require('helmet');

const app = express();


// Passport Config
require('./config/passport')(passport);

// // DB Config
// const db = require('./config/keys').mongoURI;

// // Connect to Mongo
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Library MongoDb Connected...'))
//     .catch(err => console.log(err))


// Set up mongoose connection 
// var dev_db_url = 'mongodb+srv://dbUser:dbUser123@cluster0-kg7ic.azure.mongodb.net/local_library_prod?retryWrites=true&w=majority'
// var mongoDB = process.env.MONGODB_URI || dev_db_url;
const mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Express body-parser (!!middleware)
    // We will get data from forms, so we need to add body-parser middleware
    // body-parser is included with express
    app.use(express.urlencoded({ extended: false }));
    // This way we can get data from forms with request.body


// Express Session (!!middleware)
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware ---> THIS IS THE PLACE, before flash()!!!
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash (!!middleware)
app.use(flash())  // !!Now we have access to request.flash


// Global Vars (!!middleware)
        // Since we have access to request.flash, we need to use colors for massages, so we need some global vars
        // These errors will appear when we do redirect !!!
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg') // will call this msg in users.js, when user->save&register->success, before res.redirect to /users/login
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')   // show the flash for passport -> login. The error will be in: req.flash('error') (see minute: 1.16.00 in the video). 
                          // It goes to messages.ejs, check for error and display it!
  next()
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); //Compress all routes
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/catalog', require('./routes/catalog'));  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
