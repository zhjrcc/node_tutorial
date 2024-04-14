const express = require("express");
const router = express.Router();
const contacts = require("../controllers/contactControllers");

router.route("/").get(contacts.getAllContacts).post(contacts.addContact);

router
  .route("/:id")
  .get(contacts.getContact)
  .put(contacts.updateContact)
  .delete(contacts.deleteContact);
module.exports = router;
