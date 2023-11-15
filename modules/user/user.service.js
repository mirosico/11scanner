const User = require("../../db/User");

const createUser = async (user) => {
    try {
        const newUser = new User({
            ...user,
            scans: [],
        });
        await newUser.save();
        return newUser;
    } catch (e) {
        console.error(e);
    }
    return null;
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return null;
        }
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}


module.exports = {
    createUser,
    getUserByEmail,
}