const PDFDocument = require('pdfkit');
const fs = require('fs');


const createPDF = async (filename, data, res) => {
    try {
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(`Content-Disposition', 'attachment; filename=${filename}.pdf`);
        doc.pipe(res);
        doc.text(data);
        doc.end();
    } catch (e) {
        console.error(e);
        res.status(500).send("Error generating PDF");
    }
}

module.exports = {
    createPDF,
}