const Casillero = require("../models/Casillero");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createCasillero = async (req, res) => {
  const casillero = await Casillero.create(req.body);
  res.status(StatusCodes.CREATED).json({ casillero });
};

const deleteCasillero = async (req, res) => {
  const {
    params: { id: casilleroId },
  } = req;

  const casillero = await Casillero.findByIdAndRemove({
    _id: casilleroId,
  });
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
  const {
    params: { id: casilleroId },
  } = req;

  const casillero = await Casillero.findOne({
    _id: casilleroId,
  });
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
