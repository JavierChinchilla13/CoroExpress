const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router
  .route("/updateUser")
  .patch(authenticateUser, authorizePermissions("admin"), updateUser);

router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .delete(authenticateUser, authorizePermissions("admin"), deleteUser);

module.exports = router;
