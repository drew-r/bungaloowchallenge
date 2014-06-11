var mongoose = require('mongoose');
var password = require('password');
var ObjectId = mongoose.Schema.Types.ObjectId;
var userSchema = mongoose.Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
});

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    password.hashPassword(user.password,function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });

});

userSchema.methods.testPassword = function(candidatePassword, cb) {
    password.testPassword(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);




