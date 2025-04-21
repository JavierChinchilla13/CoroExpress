const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const sendEmail = require("./sendEmail");

const sendPersonalizedPDF = async ({ name, email }) => {
  const templatePath = path.join(__dirname, "./template.pdf");
  const pdfBytes = fs.readFileSync(templatePath);

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { height } = firstPage.getSize();

  firstPage.drawText(name, {
    x: 50,
    y: height - 155,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();
  const safeName = name.replace(/\s+/g, "_");
  const outputFileName = `casillero-${safeName}.pdf`;
  const outputPath = path.join(__dirname, `../public/pdfs/${outputFileName}`);

  fs.writeFileSync(outputPath, modifiedPdfBytes);

  await sendEmail({
    to: email,
    subject: "Tu casillero con Coro Express",
    html: `<p>Hola ${name}, adjunto encontrarás tu casillero personalizado con Coro Express.</p>`,
    attachments: [
      {
        filename: outputFileName,
        path: outputPath,
      },
    ],
  });

  return `/pdfs/${outputFileName}`;
};

module.exports = sendPersonalizedPDF;
