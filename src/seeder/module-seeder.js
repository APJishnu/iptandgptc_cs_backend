import dotenv from "dotenv";
import Module from "../models/modules.js";
import Subject from "../models/subjects.js";


dotenv.config();

// Define module data
const modulesData = [
  // Modules for "Communication Skills in English" (1001)
  { module_number: 1, module_name: "Introduction to Communication", subject_code: "1001" },
  { module_number: 2, module_name: "Advanced Communication Skills", subject_code: "1001" },

  // Modules for "Mathematics I" (1002)
  { module_number: 1, module_name: "Algebra Basics", subject_code: "1002" },
  { module_number: 2, module_name: "Calculus and Functions", subject_code: "1002" },

  // Modules for "Applied Physics I" (1003)
  { module_number: 1, module_name: "Mechanics", subject_code: "1003" },

  // Modules for "Programming in C" (3132)
  { module_number: 1, module_name: "C Basics", subject_code: "3132" },
  { module_number: 2, module_name: "Advanced C Programming", subject_code: "3132" },
];

const seedModules = async () => {
  try {
    

    await Module.deleteMany();
    console.log("Existing modules deleted.");

    // Fetch all subjects and create a subject map
    const subjects = await Subject.find();
    const subjectMap = {};
    subjects.forEach((subject) => {
      subjectMap[subject.subject_code] = subject._id;
    });

    // Insert modules and store the inserted module IDs
    const moduleInserts = await Promise.all(
      modulesData.map(async (module) => {
        const newModule = await Module.create({
          module_number: module.module_number,
          module_name: module.module_name,
          subject: subjectMap[module.subject_code], // Link to Subject ID
        });

        // Push the new module ID into the corresponding subject
        await Subject.findByIdAndUpdate(subjectMap[module.subject_code], {
          $push: { modules: newModule._id },
        });

        return newModule;
      })
    );

    console.log("Modules seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding modules:", error);
    process.exit(1);
  }
};


// Run the seed function
export default seedModules;
