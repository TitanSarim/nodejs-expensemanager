const jwt = require('jsonwebtoken');

const generatedToken = (userid, username, userEmail) => {

    const token = jwt.sign({userid, username, userEmail}, process.env.JWT_SECRET, { expiresIn: '7d' });

    return token;
}

module.exports = {generatedToken}