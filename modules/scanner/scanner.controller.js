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
        const scan = await ScanService.saveScan({
            email: req.user.email,
            url,
            violations: results,
        });
        res.status(200).json(scan);
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
        console.log(options);
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

const getScan = async (req, res) => {
    try {
        const scan = await ScanService.getScan(req.params.id);
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
        const results = await ScanService.getScan(req.params.id);
        if (!results) {
            return res.status(404).json({
                error: "Results not found!",
            });
        }
        console.log(results);
        const text = ResultsConverter.toText(results);
        const domain = new URL(results.url).hostname.replaceAll(".", "");
        await PDFService.createPDF(domain, text, res);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e,
        });
    }
}

const deleteScan = async (req, res) => {
    try {
        const scan = await ScanService.deleteScan(req.user.email, req.params.id);
        if (!scan) {
            return res.status(404).json({
                error: "Scan not found!",
            });
        }
        res.status(200).json(scan);
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
    generatePDF,
    getScan,
    deleteScan,
}