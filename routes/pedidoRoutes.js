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

router.route("/:id").delete(deletePedido).patch(updatePedido);
router.route("/:tracking").get(getPedido);

module.exports = router;
