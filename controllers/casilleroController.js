const Casillero = require("../models/Casillero");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const sendPersonalizedPDF = require("../utils/sendPersonalizedPDF");

const createCasillero = async (req, res) => {
  const { fullName, number, email } = req.body;

  if (!fullName || !number || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Buscar un casillero que tenga los tres campos coincidentes
  let casillero = await Casillero.findOne({ fullName, number, email });

  if (casillero) {
    // Ya existe: reenviar PDF
    const downloadUrl = await sendPersonalizedPDF({
      name: casillero.fullName,
      email,
    });

    return res.status(StatusCodes.OK).json({
      message: "Ya existía un casillero con estos datos. Se reenvió el PDF.",
      downloadUrl: `http://localhost:5000${downloadUrl}`,
    });
  }

  // Si no existe: crear nuevo casillero y enviar PDF
  casillero = await Casillero.create({ fullName, number, email });

  const downloadUrl = await sendPersonalizedPDF({ name: fullName, email });

  res.status(StatusCodes.CREATED).json({
    message: "Casillero creado exitosamente",
    casillero,
    downloadUrl: `http://localhost:5000${downloadUrl}`,
  });
};

const deleteCasillero = async (req, res) => {
  const { id: casilleroId } = req.params;

  const casillero = await Casillero.findByIdAndRemove({ _id: casilleroId });
  if (!casillero) {
    throw new NotFoundError(`No casillero with id ${casilleroId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllCasilleros = async (req, res) => {
  const casilleros = await Casillero.find({});
  res.status(StatusCodes.OK).json({ casilleros });
};

const getCasillero = async (req, res) => {
  const { id: casilleroId } = req.params;

  const casillero = await Casillero.findOne({ _id: casilleroId });
  if (!casillero) {
    throw new NotFoundError(`No casillero with id ${casilleroId}`);
  }
  res.status(StatusCodes.OK).json({ casillero });
};

module.exports = {
  createCasillero,
  deleteCasillero,
  getAllCasilleros,
  getCasillero,
};
