var path = require('path');
var rootPath = path.normalize(__dirname +'/../../');

var rootPath = 
module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://rthainu:multivision@ds227459.mlab.com:27459/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }
}