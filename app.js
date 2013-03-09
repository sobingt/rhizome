
/**
 * Module dependencies.
 */

var express = require('express')
  , models = require('./schemas/models')
  , routes = require('./routes')
  , user = require('./routes/user')
  , decision = require('./routes/decision')
  , option = require('./routes/option')
  , http = require('http')
  , path = require('path');

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
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/decision/:id', decision.view);
app.get('/decision/:id/new', decision.new);
app.get('/decision/:id/unvoted', decision.unvoted);
app.get('/decision/:id/results', decision.results);
app.get('/option/:id', option.view);
app.get('/option/:id/arguments', option.arguments);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
