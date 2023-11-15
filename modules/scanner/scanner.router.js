const express = require('express');
const scannerController = require("./scanner.controller");
const router = express.Router();

router.post('/scan', scannerController.scan);
router.get('/options', scannerController.getScanOptions);
router.get('/scans', scannerController.getAllScans);
router.post('/save', scannerController.saveScan);
router.get('/pdf', scannerController.generatePDF);

module.exports = router;