// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "robotdreams";
const collection = "blogs";

// Create a new database.
use(database);

const sampleData = [
  {
    title: "Introduction to MongoDB",
    content: "This post will introduce you to MongoDB, a NoSQL database...",
    author: "John Doe",
    course: "Database Systems",
    date: new Date(),
  },
  {
    title: "Understanding Express.js",
    content: "Express.js is a web application framework for Node.js...",
    author: "Jane Doe",
    course: "Web Development",
    date: new Date(),
  },
  {
    title: "Getting Started with React",
    content: "React is a JavaScript library for building user interfaces...",
    author: "John Doe",
    course: "Web Development",
    date: new Date(),
  },
];

db.getCollection(collection).insertMany(sampleData, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Successfully inserted ${result.insertedCount} documents.`);
  }
});
