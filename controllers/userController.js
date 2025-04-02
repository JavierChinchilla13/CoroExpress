const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find().select("-password"); // Excluir la contraseña
  res.status(StatusCodes.OK).json({ users });
};

// Obtener un usuario específico por ID
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(
      `No existe un usuario con el ID: ${req.params.id}`
    );
  }
  checkPermissions(req.user, user._id); // Verificar permisos
  res.status(StatusCodes.OK).json({ user });
};

// Mostrar el usuario actual (sesión activa)
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// Actualizar usuario (con user.save())
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError(
      "Por favor, proporciona todos los valores."
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  // Actualizar los campos
  user.email = email;
  user.name = name;

  await user.save(); // Guardar cambios en la base de datos

  const tokenUser = createTokenUser(user); // Crear un nuevo token
  attachCookiesToResponse({ res, user: tokenUser }); // Adjuntar cookies
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Actualizar la contraseña del usuario
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Por favor, proporciona ambos valores."
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  // Verificar si la contraseña antigua es correcta
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthorizedError("Credenciales inválidas.");
  }

  // Actualizar la contraseña
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "¡Éxito! Contraseña actualizada." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
