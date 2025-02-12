import Module from "../models/modules.js";
import Notes from "../models/notes.js";
import Subject from "../models/subjects.js";

export default class UserRepository {
  async getNotes(filters) {
    try {
      console.log(filters);

      // **🔹 Build the Query for Filtering**
      let matchStage = {};
      if (filters.module?.length) {
        matchStage.module = { $in: filters.module };
      } 
      else if (filters.subject?.length) {
        const moduleIds = await Module.find({ subject: { $in: filters.subject } }).select("_id");
        matchStage.module = { $in: moduleIds.map((m) => m._id) };
      } 
      else if (filters.semester?.length) {
        const subjectIds = await Subject.find({ semester: { $in: filters.semester } }).select("_id");
        const moduleIds = await Module.find({ subject: { $in: subjectIds.map(s => s._id) } }).select("_id");
        matchStage.module = { $in: moduleIds.map((m) => m._id) };
      }

      // **🔹 Pagination Setup**
      const page = filters.page ? parseInt(filters.page, 10) : 1;
      const limit = filters.limit ? parseInt(filters.limit, 10) : 2; // Default limit to 2 rows per page
      const skip = (page - 1) * limit;

      // **🔹 Aggregation Pipeline**
      const notesAggregation = await Notes.aggregate([
        { $match: matchStage },  // Filter notes based on conditions
        {
          $lookup: {
            from: "modules",
            localField: "module",
            foreignField: "_id",
            as: "moduleDetails"
          }
        },
        { $unwind: "$moduleDetails" },
        {
          $lookup: {
            from: "subjects",
            localField: "moduleDetails.subject",
            foreignField: "_id",
            as: "subjectDetails"
          }
        },
        { $unwind: "$subjectDetails" },

        // **🔹 Format Data**
        {
          $project: {
            _id: 0,
            id: "$_id",
            semester: "$subjectDetails.semester",
            subject: "$subjectDetails.name",
            module: "$moduleDetails.module_name",
            notes: "$notes" // Keep the notes array for further processing
          }
        },
        
        { $unwind: "$notes" }, // Flatten the notes array

        {
          $project: {
            id: 1,
            semester: 1,
            subject: 1,
            module: 1,
            description: "$notes.description",
            file_url: "$notes.file_url",
            link_url: "$notes.link_url"
          }
        },

        // **🔹 Total Count Before Pagination**
        {
          $facet: {
            paginatedResults: [
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $count: "count" }
            ]
          }
        }
      ]);

      // Extract Data & Total Count
      const formattedNotes = notesAggregation[0].paginatedResults;
      const totalItems = notesAggregation[0].totalCount[0]?.count || 0; // Ensure totalItems is always defined

      return { status: true, data: formattedNotes, totalItems };
    } catch (error) {
      console.error("Error fetching notes:", error);
      return { status: false, message: "Failed to fetch notes." };
    }
  }
}
