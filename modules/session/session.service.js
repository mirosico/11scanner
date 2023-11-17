const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = async (user) => {
    try {
        return await jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
    } catch (e) {
        console.error(e);
        return null;
    }
}

const verifyToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        console.error(e);
        return null;
    }
}


module.exports = {
    generateToken,
    verifyToken,
}