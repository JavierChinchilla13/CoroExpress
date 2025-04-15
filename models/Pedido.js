const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const PedidoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Porfavor ingrese un nombre"],
    maxlength: 50,
  },
  number: {
    type: Number,
    required: [true, "Porfavor ingrese numero de telefono"],
    maxlength: 15,
  },
  store: {
    type: String,
    required: [true, "Porfavor ingrese el lugar de compra"],
    maxlength: 50,
  },
  tracking: {
    type: String,
    required: [true, "Porfavor ingrese el numero de rastreo"],
    maxlength: 50,
  },
  direction: {
    type: String,
    required: [true, "Porfavor ingrese el lugar de entreha"],
    maxlength: 250,
  },
  state: {
    type: String,
    enum: {
      values: ["tramite", "miami", "cr", "aduanas", "listo", "entregado"],
      message: "{VALUE} is not supported",
    },
    default: "tramite",
  },
  peso: {
    type: Number,
  },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
