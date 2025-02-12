import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true },
    file_url: { type: String, trim: true },
    link_url: { type: String, trim: true },
  },
  { timestamps: true }
);

const notesSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    notes: [noteSchema], // Array of notes inside the module
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
