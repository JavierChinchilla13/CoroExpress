const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const sendEmail = require("./sendEmail");

const sendPersonalizedPDF = async ({ name, email }) => {
  const templatePath = path.join(__dirname, "./final.pdf");
  const pdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { height } = pages[0].getSize();

  // Aquí defines manualmente las posiciones de las 3 ocurrencias de "Nombre:"
  const namePositions = [
    { page: 0, x: 140, y: height - 219 }, // Primera ocurrencia
    { page: 0, x: 296, y: height - 462 }, // Segunda ocurrencia
    { page: 1, x: 140, y: height - 213 }, // Tercera ocurrencia
  ];

  namePositions.forEach(({ page, x, y }) => {
    pages[page].drawText(name, {
      x,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
  });

  const modifiedPdfBytes = await pdfDoc.save();

  const safeName = name.replace(/\s+/g, "_");
  const outputFileName = `casillero-${safeName}.pdf`;
  const outputPath = path.join(__dirname, `../public/pdfs/${outputFileName}`);

  // Asegúrate que el directorio exista
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, modifiedPdfBytes);

  // Envía el email con el PDF adjunto
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
