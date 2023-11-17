const express = require('express');
const scannerController = require("./scanner.controller");
const router = express.Router();

router.post('/scan', scannerController.scan);
router.get('/options', scannerController.getScanOptions);
router.get('/results', scannerController.getAllScans);
router.get('/results/:id', scannerController.getScan);
router.get('/results/:id/pdf', scannerController.generatePDF);
router.delete('/results/:id', scannerController.deleteScan);

module.exports = router;