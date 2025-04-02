const express = require("express");
const router = express.Router();

const {
  createCasillero,
  deleteCasillero,
  getAllCasilleros,
  getCasillero,
} = require("../controllers/casilleroController");

router.route("/").post(createCasillero).get(getAllCasilleros);

router.route("/:id").get(getCasillero).delete(deleteCasillero);
module.exports = router;
