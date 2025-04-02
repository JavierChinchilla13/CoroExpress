// module.exports = {
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "jamaal.steuber59@ethereal.email",
//     pass: "8YmbvtxrRsM2kjsMrJ",
//   },
// };

module.exports = {
  host: "smtp.gmail.com",
  port: 587, // Port 587 for TLS
  secure: false, // Use TLS, so secure is false
  auth: {
    user: process.env.CORREO, // Replace with your Gmail address
    pass: process.env.CCLAVE, // Replace with your Gmail App Password
  },
};
