const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// todoSchema.methods = {
//   findActive: async function () {
//     return await mongoose.model("Todo").find({ status: "inactive" });
//   },
// };

module.exports = todoSchema;
