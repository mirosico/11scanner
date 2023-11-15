const Scans = require('../../db/Scans');
const UserServices = require('../user/user.service');
const violationsMap = require('./scanner.config');

const getScanOptions = async () => {
    return Object.entries(violationsMap).map(([key, value]) => ({
        key,
        ...value,
    }));
}

const saveScan = async ({email, url, violations}) => {
    try {
        const scan = new Scans({
            url,
            violations,
        });
        await scan.save();
        const user = await UserServices.getUserByEmail(email);
        user.scans.push(scan._id);
        await user.save();
        return scan;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const getAllScans = async (email) => {
    try {
        const user = await UserServices.getUserByEmail(email);
        const scans = await Scans.find({
            _id: {
                $in: user.scans,
            }
        }).exec();
        return scans;
    } catch (e) {
        console.error(e);
        return null;
    }
}



module.exports = {
    saveScan,
    getScanOptions,
    getAllScans,
}