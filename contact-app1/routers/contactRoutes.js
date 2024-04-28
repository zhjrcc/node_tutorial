const express = require("express");
const router = express.Router();
const contact = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(contact.getAllContacts).post(contact.addContact);

router
  .route("/:id")
  .get(contact.getContact)
  .put(contact.updateContact)
  .delete(contact.deleteContact)
module.exports = router;
