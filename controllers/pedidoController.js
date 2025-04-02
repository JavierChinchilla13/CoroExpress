const Pedido = require("../models/Pedido");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createPedido = async (req, res) => {
  const pedido = await Pedido.create(req.body);
  res.status(StatusCodes.CREATED).json({ pedido });
};

const deletePedido = async (req, res) => {
  const {
    params: { id: pedidoId },
  } = req;

  const pedido = await Pedido.findByIdAndRemove({
    _id: pedidoId,
  });
  if (!pedido) {
    throw new NotFoundError(`No pedido with id ${pedidoId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllPedidos = async (req, res) => {
  const pedidos = await Pedido.find({});
  res.status(StatusCodes.OK).json({ pedidos });
};

const updatePedido = async (req, res) => {
  const {
    body: { fullName, number, store, tracking, direction, state },
    params: { id: pedidoId },
  } = req;

  console.log("backend");
  console.log(req.body);

  if (
    fullName === "" ||
    number === "" ||
    store === "" ||
    tracking === "" ||
    direction === "" ||
    state === ""
  ) {
    throw new BadRequestError("Name field cannot be empty");
  }
  const pedido = await Pedido.findByIdAndUpdate({ _id: pedidoId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pedido) {
    throw new NotFoundError(`No pedido with id ${pedidoId}`);
  }
  res.status(StatusCodes.OK).json({ pedido });
};

const getPedido = async (req, res) => {
  const {
    params: { id: pedidoId },
  } = req;

  const pedido = await Pedido.findOne({
    _id: pedidoId,
  });
  if (!pedido) {
    throw new NotFoundError(`No pedido with id ${pedidoId}`);
  }
  res.status(StatusCodes.OK).json({ pedido });
};

module.exports = {
  createPedido,
  deletePedido,
  getAllPedidos,
  updatePedido,
  getPedido,
};
