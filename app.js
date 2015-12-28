/**
 * Created by liyang on 15/12/26.
 */
var koa = require('koa.io');

var app = koa();


// middleware for koa
app.use(function*() {
});


// middleware for socket.io's connect and disconnect
app.io.use(function* (next) {
    // on connect
    console.log('on connect');
    yield* next;
    console.log('on disconnect');
    // on disconnect
});

// router for socket event
app.io.route('new message', function* () {
    // we tell the client to execute 'new message'
    var message = this.args[0];
    console.log(message);
    this.broadcast.emit('new message', message);
});

app.listen(3000);