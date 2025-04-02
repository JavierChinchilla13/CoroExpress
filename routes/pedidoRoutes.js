const express = require("express");
const router = express.Router();

const {
  createPedido,
  deletePedido,
  getAllPedidos,
  updatePedido,
  getPedido,
} = require("../controllers/pedidoController");

router.route("/").post(createPedido).get(getAllPedidos);

router.route("/:id").get(getPedido).delete(deletePedido).patch(updatePedido);

module.exports = router;
