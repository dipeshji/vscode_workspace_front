const crypto = require('crypto')

exports.getCipherKey = function (password) {
    return crypto.createHash('sha256').update(password).digest();
}



module.exports.mongoDB = "mongodb://localhost:27017/test_db"