const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Por favor, restablezca su contraseña haciendo clic en el siguiente enlace: <a href="${resetURL}">Restablecer contraseña</a></p>`;

  return sendEmail({
    to: email,
    subject: "Restablecer Contraseña",
    html: `<h4>Hola, ${name}</h4>
    ${message}`,
  });
};

module.exports = sendResetPasswordEmail;
