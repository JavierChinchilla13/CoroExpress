const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Porfavor ingrese un nombre"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Porfavor ingrese un email"],
    validate: {
      validator: validator.isEmail,
      message: "Porfavor ingrese un email valido",
    },
    unique: [true, "Porfavor ingrese un email"],
  },
  password: {
    type: String,
    required: [true, "Porfavor ingrese una clave"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "manager"],
    default: "manager",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
