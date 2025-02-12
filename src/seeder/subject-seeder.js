import dotenv from "dotenv";
import Subject from "../models/subjects.js"; // Adjust the path if needed

dotenv.config();

// Define the subject data for three semesters
const subjects = [
  // Semester 1
  { subject_code: "1001", name: "Communication Skills in English", semester: 1 },
  { subject_code: "1002", name: "Mathematics I", semester: 1 },
  { subject_code: "1003", name: "Applied Physics I", semester: 1 },
  { subject_code: "1004", name: "Applied Chemistry", semester: 1 },
  { subject_code: "1005", name: "Engineering Graphics", semester: 1 },
  { subject_code: "1007", name: "Applied Chemistry Lab", semester: 1 },
  { subject_code: "1008", name: "Introduction to IT Systems Lab", semester: 1 },
  { subject_code: "1009", name: "Sports and Yoga", semester: 1 },
  { subject_code: "2006A", name: "Applied Physics Lab", semester: 1 },
  { subject_code: "2009A", name: "Engineering Workshop Practice", semester: 1 },

  // Semester 2
  { subject_code: "2001", name: "Environmental Science", semester: 2 },
  { subject_code: "2002", name: "Mathematics II", semester: 2 },
  { subject_code: "2003", name: "Applied Physics II", semester: 2 },
  { subject_code: "2006", name: "Applied Physics Lab", semester: 2 },
  { subject_code: "2008", name: "Communication Skills in English Lab", semester: 2 },
  { subject_code: "2009", name: "Engineering Workshop Practice", semester: 2 },
  { subject_code: "2031", name: "Fundamentals of Electrical & Electronics Engineering", semester: 2 },
  { subject_code: "2039", name: "Fundamentals of Electrical & Electronics Engineering Lab", semester: 2 },
  { subject_code: "2131", name: "Problem Solving and Programming", semester: 2 },
  { subject_code: "2139", name: "Problem Solving and Programming Lab", semester: 2 },

  // Semester 3
  { subject_code: "3009", name: "Internship I", semester: 3 },
  { subject_code: "3131", name: "Computer Organisation", semester: 3 },
  { subject_code: "3132", name: "Programming in C", semester: 3 },
  { subject_code: "3133", name: "Database Management Systems", semester: 3 },
  { subject_code: "3134", name: "Digital Computer Fundamentals", semester: 3 },
  { subject_code: "3135", name: "Programming in C Lab", semester: 3 },
  { subject_code: "3136", name: "Database Management System Lab", semester: 3 },
  { subject_code: "3137", name: "Digital Computer Fundamentals Lab", semester: 3 },
  { subject_code: "3138", name: "Web Technology Lab", semester: 3 },
  { subject_code: "3139", name: "Computer System Hardware Lab", semester: 3 },
];

// Function to seed the database
const seedSubjects = async () => {
  try {
    await Subject.deleteMany(); // Clear existing subjects
    console.log("Existing subjects deleted.");

    await Subject.insertMany(subjects); // Insert new subjects
    console.log("Subjects seeded successfully!");

  } catch (error) {
    console.error("Error seeding subjects:", error);
    process.exit(1);
  }
};

// Run the seed function
export default seedSubjects
