var createError = require('http-errors');
var express = require('express');
var cons = require('consolidate');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var winesRouter = require('./routes/wines');


// view engine setup
// assign the swig engine to .html files
app.engine('pug', cons.pug);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));
app.use(express.static(path.join(__dirname, 'public'), {'index': false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wines', winesRouter);

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

io.on('connection', function (socket) {
    console.log("Socket connected");

    socket.on('message', function (message) {
        console.log("Got message: " + message);
        ip = socket.handshake.address.address;
        url = message;
        io.sockets.emit('pageview', { 'connections': Object.keys(io.connected).length, 'ip': '***.***.***.' + ip.substring(ip.lastIndexOf('.') + 1), 'url': url, 'xdomain': socket.handshake.xdomain, 'timestamp': new Date()});
    });

    socket.on('disconnect', function () {
        console.log("Socket disconnected");
        io.sockets.emit('pageview', { 'connections': Object.keys(io.connected).length});
    });

});

module.exports = app;
