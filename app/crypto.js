var crypto = require('crypto');

module.exports = {
    generateSalt: () => {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashedPassword: (salt, pwd) => {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
