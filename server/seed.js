const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Education = require('./models/Education');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');

// Load environment variables
dotenv.config();

// Function to connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Clear all collections and insert seed data
const importData = async () => {
  try {
    // Clear existing data
    await Education.deleteMany();
    await Skill.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    
    console.log('Data cleared...');

    // Education Data
    const educationData = [
      {
        institution: "INFORMATION TECHNOLOGY UNIVERSITY",
        qualification: "BS-Computer Science",
        year: "2027 - Present",
        score: "CGPA: 3.81",
      },
      {
        institution: "PUNJAB GROUP OF COLLEGES",
        qualification: "Pre-Engineering",
        year: "2023",
        score: "Marks: 975/1100",
      },
      {
        institution: "UNIQUE GROUP OF INSTITUTIONS",
        qualification: "MATRIC-BIO",
        year: "2021",
        score: "92.36%",
      }
    ];
    
    // Skills Data - Card Skills
    const cardSkillsData = [
      { name: "FIGMA", icon: "figma", category: "Design" },
      { name: "UNITY", icon: "unity", category: "Game Development" },
      { name: "APP DEVELOPMENT", icon: "android", category: "Mobile" },
      { name: "Database Administration", icon: "database", category: "Database" }
    ];
    
    // Skills Data - Coding Skills
    const codingSkillsData = [
      { name: "HTML", value: 80, category: "Frontend" },
      { name: "CSS", value: 60, category: "Frontend" },
      { name: "JavaScript", value: 55, category: "Frontend" },
      { name: "React", value: 25, category: "Frontend" },
      { name: "C++", value: 95, category: "Programming" },
      { name: "Python", value: 85, category: "Programming" },
      { name: "Java", value: 70, category: "Programming" },
      { name: "SQL", value: 97, category: "Database" }
    ];
    
    // Project Data
    const projectData = [
      {
        name: "Titan-Factory",
        description: "AI-powered industrial management system that streamlines factory operations",
        repoUrl: "https://github.com/abdullahiftikharcode/Titan-Factory",
        technologies: ["Python", "TensorFlow", "React"],
        language: "Python",
        featured: true,
        stargazers_count: 12,
        forks_count: 3,
        updated_at: new Date("2023-05-15")
      },
      {
        name: "Campus-Pulse",
        description: "Robust club and society management app crafted using Java and XML",
        repoUrl: "https://github.com/abdullahiftikharcode/Campus-Pulse",
        technologies: ["Java", "XML", "Firebase"],
        language: "Java",
        stargazers_count: 8,
        forks_count: 2,
        updated_at: new Date("2023-08-20")
      },
      {
        name: "Bookstore-Management-System",
        description: "Bookstore Management System in Python with a custom-built face verification system",
        repoUrl: "https://github.com/abdullahiftikharcode/Bookstore-Management-System",
        technologies: ["Python", "OpenCV", "SQLite"],
        language: "Python",
        stargazers_count: 15,
        forks_count: 4,
        updated_at: new Date("2023-07-12")
      },
      {
        name: "Chess",
        description: "Chess game in C++ with features like Highlight, Check, Checkmate, Undo and Redo",
        repoUrl: "https://github.com/abdullahiftikharcode/Chess",
        technologies: ["C++", "SFML"],
        language: "C++",
        stargazers_count: 10,
        forks_count: 1,
        updated_at: new Date("2023-06-30")
      }
    ];
    
    // Experience Data
    const experienceData = [
      {
        company: "Freelance Developer",
        position: "Web Developer",
        duration: "2022 - Present",
        description: "Developing responsive and user-friendly websites for clients using modern web technologies.",
        responsibilities: [
          "Creating custom websites using HTML, CSS, and JavaScript",
          "Implementing responsive designs using Bootstrap and other frameworks",
          "Optimizing websites for performance and SEO"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "React"],
        startDate: new Date("2022-01-01")
      },
      {
        company: "XYZ Tech",
        position: "Junior Developer Intern",
        duration: "Summer 2023",
        description: "Worked on various projects as part of the development team.",
        responsibilities: [
          "Assisted in developing new features for the company's main product",
          "Fixed bugs and improved existing code",
          "Participated in code reviews and team meetings"
        ],
        technologies: ["Java", "Spring Boot", "MySQL"],
        startDate: new Date("2023-05-01"),
        endDate: new Date("2023-08-31"),
        location: "Remote"
      }
    ];

    // Insert all data
    await Education.insertMany(educationData);
    await Skill.insertMany([...cardSkillsData, ...codingSkillsData]);
    await Project.insertMany(projectData);
    await Experience.insertMany(experienceData);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Execute seed data import
connectDB().then(() => {
  importData();
}); 