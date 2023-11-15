const bcrypt  = require("bcrypt");


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (e) {
        console.error(e);
    }
    return null;
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return !!match;
    } catch (e) {
        console.error(e);
    }
    return false;
}

module.exports = {
    hashPassword,
    comparePassword,
}