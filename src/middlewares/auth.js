const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const email = await jwt.verify(token, 'secret');
        if (email) {
            req.query['email'] = jwt.decode(token);
            next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: error.message,
            error: true
        })
    }
}

module.exports = auth