//globals
SECRET_KEY = "bungaloow_challenge_123";


//deps
var app = require('app');


//  db connection
var db = require('db');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', runApp);


// initialize

function runApp() {
    require('auth');
    require('./routes');
    app.listen(8080);
    console.log('LISTEN 8080');
}

