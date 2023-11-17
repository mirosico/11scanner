const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Please provide an URL!"],
    },
    violations: {
        type: Object,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Scans", ScanSchema);