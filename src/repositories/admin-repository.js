import Events from "../models/event-schema.js";
import Notes from "../models/notes.js";
import Subject from "../models/subjects.js";
import superAdmin from "../models/super-admin.js";

export default class AdminRepository {
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
      const notes = await Notes.find().populate({
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
          id: n._id,
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

  async deleteNote(noteId) {
    try {
      const result = await Notes.findOneAndUpdate(
        { "notes._id": noteId }, // Find the note inside the array
        { $pull: { notes: { _id: noteId } } }, // Remove it from the array
        { new: true } // Return the updated document
      );

      return result;
    } catch (error) {
      console.error("Error deleting note:", error);
      return null;
    }
  }

  /**
   * Find admin by email.
   * @param {string} email - Admin email
   * @returns {Promise<Object|null>} - Admin object or null
   */
  async findAdminByEmail(email) {
    const admin = await superAdmin.findOne({email});
    return admin;
  }

  /**
   * Create a new admin.
   * @param {Object} adminData - Admin details (email, password, role)
   * @returns {Promise<Object>} - Created admin
   */
  async createAdmin(adminData) {
    return await superAdmin.create(adminData);
  }


  /**
   * Create a new event in the database
   * @param {Object} eventData - Event details
   * @returns {Promise<Object>} - Created event
   */
  async createEvent(eventData) {
    return await Events.create(eventData);
  }

}
