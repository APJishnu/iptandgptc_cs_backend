import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    module_number: {
      type: Number,
      required: true,
    },
    module_name: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", // Reference to Subject model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;
