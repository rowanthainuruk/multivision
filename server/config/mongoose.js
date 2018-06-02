var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error....'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'rowan')
            User.create({firstName:'Rowan', lastName:'Thainuruk', username:'rowan', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'john')
            User.create({firstName:'John', lastName:'{Papa}', username:'john', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'tony')
            User.create({firstName:'Tony', lastName:'Stark', username:'ironman', salt: salt, hashed_pwd: hash});
        }
    })
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read()
    // return hmac.update(pwd).digest('hex');
}

