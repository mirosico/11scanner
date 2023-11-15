const ScanService = require("./scanner.service");
const ParserService = require("../parser/parser.service");
const Scanner = require("./scanner");
const ResultsConverter = require("./results-converter");
const PDFService = require("../pdf/pdf.service");


const scan = async (req, res) => {
    try {
        const { url, violationsToIgnore } = req.body;
        const elements = await ParserService.parseWebsite(url);
        if (!elements) {
            return res.status(404).json({
                error: "No elements found",
            });
        }
        const results = Scanner.scan(elements, violationsToIgnore);
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

const getScanOptions = async (req, res) => {
    try {
        const options = await ScanService.getScanOptions();
        res.status(200).json(options);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

const getAllScans = async (req, res) => {
    try {
        const scans = await ScanService.getAllScans(req.user.email);
        res.status(200).json(scans);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

const saveScan = async (req, res) => {
    try {
        const { url, violations } = req.body;
        const scan = await ScanService.saveScan({
            email: req.user.email,
            url,
            violations,
        });
        res.status(200).json(scan);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

const generatePDF = async (req, res) => {
    try {
        const text = ResultsConverter.toText(req.body);
        await PDFService.createPDF(req.body.url, text, res);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

module.exports = {
    scan,
    getScanOptions,
    getAllScans,
    saveScan,
    generatePDF,
}