const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, require: true },
    ip: { type: String, require: true },
    userAgent: { type: String, require: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
