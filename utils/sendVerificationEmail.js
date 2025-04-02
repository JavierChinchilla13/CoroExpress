const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  // Enlace para verificar el correo electrónico
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  // Mensaje del correo electrónico
  const message = `<p>Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace: <a href="${verifyEmail}">Verificar Correo</a></p>`;

  // Enviar el correo electrónico
  return sendEmail({
    to: email,
    subject: "Confirmación de Correo Electrónico",
    html: `<h4>Hola, ${name}</h4>
    ${message}`,
  });
};

module.exports = sendVerificationEmail;
