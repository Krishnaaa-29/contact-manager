const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Get all Contacts
//@route GET /api/contact
const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(error.statusCode);
    throw new Error("Failed to fetch all the Contacts");
  }
};

//GET Single contact
//@route GET /api/contact/:id
const getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {}
};

//Create Contact
//@route POST /api/contact
const createContact = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !phone || !email) {
      res.status(400);
      throw new Error("All Fields are necessary");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(200).json(contact);
  } catch (error) {}
};

//Update Contact for a ID
//@route PUT /api/contact/:id
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).send("You don't have permission to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact does not exist");
  }
};

//delete contact
//@route DELETE /api/contact/:id
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).send("You don't have permission to delete this contact");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
  } catch (error) {}
};

module.exports = {
  getContact,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
