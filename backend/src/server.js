require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const ontologyRoutes = require("./routes/ontologyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database Connection
connectDB();

// API Routes
app.use("/api", ontologyRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    project: "Padārtha Ontology Knowledge Representation Model",
    time: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================================`);
  console.log(`  PADĀRTHA ONTOLOGY (NYĀYA) KNOWLEDGE REPRESENTATION SERVER`);
  console.log(`  B.Sc. CS Project - Aman Yadav & Tanish Gupta - Rizvi College`);
  console.log(`  Server running on http://localhost:${PORT}`);
  console.log(`  API Base: http://localhost:${PORT}/api`);
  console.log(`==================================================================`);
});
