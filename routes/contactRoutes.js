const express = require("express");
const router = express.Router();
const {
  getContact,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router
  .route("/:id")
  .put(updateContact)
  .delete(deleteContact)
  .get(getSingleContact);

module.exports = router;
