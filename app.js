/**
 * Created by liyang on 15/12/26.
 */
var koa = require('koa.io');
var views = require('koa-views');
var route = require('koa-route');

var app = koa();


app.use(function *(next){
    yield  next;
    if (404 != this.status) return;
    this.status = 404;
    yield  this.render('./views/error')
})
app.use(views());
app.use(route.get('/', function *(){
    yield  this.render('./index');
}));

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