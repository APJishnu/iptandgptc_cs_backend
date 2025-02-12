import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subject_code: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures no duplicate subject codes
    },
    semester: {
      type: Number,
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module", // Reference to Module model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
