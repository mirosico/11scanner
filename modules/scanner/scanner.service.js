const Scans = require('../../db/Scans');
const UserServices = require('../user/user.service');
const {violationsMap} = require('./scanner.config');

const getScanOptions = async () => {
    return Object.keys(violationsMap);
}

const saveScan = async ({email, url, violations}) => {
    try {
        const scan = new Scans({
            url,
            violations,
            date: Date.now(),
        });
        await scan.save();
        const user = await UserServices.getUserByEmail(email);
        if (!user.scans) {
            user.scans = [];
        }
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
        return await Scans.find({
            _id: {
                $in: user.scans,
            }
        }).exec();
    } catch (e) {
        console.error(e);
        return null;
    }
}

const getScan = async (id) => {
    try {
        return await Scans.findById(id).exec();
    } catch (e) {
        console.error(e);
        return null;
    }
}

const deleteScan = async (email, id) => {
    try {
        const user = await UserServices.getUserByEmail(email);
        user.scans = user.scans.filter(scanId => scanId !== id);
        await user.save();
        return await Scans.findByIdAndDelete(id).exec();
    } catch (e) {
        console.error(e);
        return null;
    }
}



module.exports = {
    saveScan,
    getScanOptions,
    getAllScans,
    getScan,
    deleteScan,
}