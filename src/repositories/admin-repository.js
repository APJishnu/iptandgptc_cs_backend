import Notes from "../models/notes.js";
import Subject from "../models/subjects.js";

export default class AdminRepository{
  async addNotes(module, description, fileUrl = null, linkUrl = null) {
    try {
      const existingNotes = await Notes.findOne({ module });
  
      const newNote = {
        description,
        file_url: fileUrl,
        link_url: linkUrl,
      };
  
      if (existingNotes) {
        // If module exists, push new note to the notes array
        existingNotes.notes.push(newNote);
        return await existingNotes.save();
      } else {
        // If module does not exist, create new entry
        const newNotesEntry = new Notes({
          module,
          notes: [newNote], // Initialize with the first note
        });
        return await newNotesEntry.save();
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async getSubjectsWithModules(semester) {
    try {
      const filter = semester ? { semester: semester } : {}; // Apply filter if semester is provided

      const subjectsWithModules = await Subject.find(filter)
        .populate({
          path: "modules",
          select: "_id module_name module_number", // Return module ID, Name, and Number
        })
        .select("_id name semester modules") // Return these fields
        .exec();

      return subjectsWithModules;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllNotes() {
    try {
      const notes = await Notes.find()
        .populate({
          path: "module",
          select: "module_name subject",
          populate: {
            path: "subject",
            select: "name semester",
          },
        });

      if (!notes || notes.length === 0) return [];

      // Flatten the notes structure
      return notes.flatMap((note) =>
        note.notes.map((n) => ({
          id:n._id,
          semester: note.module.subject.semester,
          subject: note.module.subject.name,
          module: note.module.module_name,
          description: n.description,
          file_url: n.file_url || "",
          link_url: n.link_url || "",
        }))
      );
    } catch (error) {
      throw new Error(error);
    }
  }


}