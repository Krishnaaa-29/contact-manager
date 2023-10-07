const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Please add Contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please add Email"],
    },
    phone: {
      type: String,
      required: [true, "Please add Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
