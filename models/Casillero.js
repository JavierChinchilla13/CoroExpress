const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const CasilleroSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Porfavor ingrese nombre nombre"],
    maxlength: 50,
  },
  number: {
    type: Number,
    required: [true, "Porfavor ingrese numero de telefono"],
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, "Porfavor ingrese un email"],
    validate: {
      validator: validator.isEmail,
      message: "Porfavor ingrese un email valido",
    },
  },
});

module.exports = mongoose.model("Casillero", CasilleroSchema);
