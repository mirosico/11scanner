const SessionService = require('../modules/session/session.service');

const auth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedToken = await SessionService.verifyToken(token);
        if (!decodedToken) {
            throw new Error('Invalid request!');
        }
        req.user = decodedToken;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

module.exports = auth;