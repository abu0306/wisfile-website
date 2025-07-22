const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function createTestPDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Set metadata
  pdfDoc.setTitle('Test Document with Metadata');
  pdfDoc.setAuthor('John Doe');
  pdfDoc.setSubject('Testing PDF Metadata');
  pdfDoc.setKeywords(['test', 'metadata', 'pdf']);
  pdfDoc.setCreator('Test Script');
  pdfDoc.setProducer('pdf-lib');
  pdfDoc.setCreationDate(new Date('2023-01-01'));
  pdfDoc.setModificationDate(new Date('2023-12-01'));

  // Add a page
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Get a font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add some text
  page.drawText('This is a test PDF with metadata', {
    x: 50,
    y: height - 100,
    size: 20,
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText('This document contains various metadata fields that can be extracted and removed.', {
    x: 50,
    y: height - 150,
    size: 12,
    font: font,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test-document.pdf', pdfBytes);
  console.log('Test PDF created: test-document.pdf');
}

createTestPDF().catch(console.error);
