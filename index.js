require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const students = require('./students.json');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( 'public' ));

let { CLIENT_SECRET, CLIENT_ID, DOMAIN, PORT } = process.env;

// Set up session //
app.use(session({
  secret:            CLIENT_SECRET,
  resave:            false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Authentication Strategy //
passport.use( new Auth0Strategy({
  domain:       DOMAIN,
  clientID:     CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL:  '/login',
  scope:        'openid email profile'
},
function(accessToken, refereshToken, extraParams, profile, done) {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done( null, profile );
}
));


passport.serializeUser( function (user, done) {
  done(null, { clientID: user.id, email: user._json.email, name: user._json.name });
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// ===== Endpoints ====== //
app.get( '/login',
  passport.authenticate('auth0',
    { successRedirect: '/index.html', failureRedirect: '/login', connection: 'github' }
  )
);

function authenticated( req, res, next ) {
  if (req.user) {
    next();
  } else {
    res.status( 401 ).send( 'Access denied' );
  }
}

app.get('/students', authenticated, (req, res, next) => {
  res.status( 200 ).send( {students} );
});

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });