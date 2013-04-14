
/**
 * Module dependencies.
 */

var express = require('express')
  , models = require('./schemas/models')
  , routes = require('./routes')
  , user = require('./routes/user')
  , group = require('./routes/group')
  , decision = require('./routes/decision')
  , proposal = require('./routes/proposal')
  , budget = require('./routes/budget')
  , http = require('http')
  , path = require('path')
  , bcrypt = require('bcrypt')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/login', user.login);
app.get('/register', user.register);
app.post('/register', user.registerHandler);
app.get('/group/start', ensureAuthenticated, group.start);
app.post('/group/start', ensureAuthenticated, group.startHandler);
app.get('/group/:subdomain', group.view);
app.get('/decision/:id', decision.view);
app.get('/decision/:id/new', decision.new);
app.get('/decision/:id/unvoted', decision.unvoted);
app.get('/decision/:id/results', decision.results);
app.get('/proposal/:id', proposal.view);
app.get('/proposal/:id/arguments', proposal.arguments);
app.get('/budget', budget.view);

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ email: username }, function (err, user) {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect email/password combination.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User
  .findById(id)
  .populate('groups', 'name subdomain')
  .exec(function (err, user) {
    var exposedUser = null;
    if (user) {
      exposedUser = {
        name: user.name,
        groups: user.groups
      }
    }
    done(err, exposedUser);
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
