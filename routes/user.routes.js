var app = require('app');
var passport = require('passport');
var User = require('../models').User;
var auth = require('auth');

app.post('/auth',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }),
    function (req, res) {
        res.json(req.user);
    });


app.get('/logout', auth, function (req, res) {
    req.logout();
    res.json(true);
});


app.get('/me',
    auth,
    function (req, res) {
        res.json(req.user);
});

app.get('/user', auth, function(req,res){
    User.find({},function(err, users){
        if (err) throw err;
        res.json(users);
    });
});

app.get('/user/:_id',
    auth,
    function(req, res){
        User.findById(req.params._id, function(err, user){
                if (err) throw err;
                res.json(user);
        });
});

app.post('/user',    
    function (req, res) {
        var newUser = new User({ username: req.body.username, password: req.body.password, email: req.body.email });
        newUser.save(function (err, user) {
            if (err) throw err;
            res.json(user);
        });
});


app.put('/user/:_id',
    auth,
    function(req, res) {
        User.findById(req.params._id, function(err, user){
            if (err) throw err;
            user.username = req.body.username;
            if (req.body.password)
            {
                user.password = req.body.password;            
                req.logout();
                console.log("logout");
            }
            user.email = req.body.email;
            user.save(function(err){
                if (err) throw err;
                res.json(user);
            });
        });
});


