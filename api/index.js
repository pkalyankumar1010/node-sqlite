require("dotenv").config();
const express = require("express");
const authRoutes = require("../routes/authRoutes");
const YAML = require("yamljs");
const db = require("../models/userModel"); // Import the database setup
const swaggerUi = require("swagger-ui-express");
const app = express();
const cors = require("cors");
// const port = process.env.PORT || 3000;
let port = parseInt(process.env.PORT, 10) || 3000;
// Load Swagger YAML file
const swaggerDocument = YAML.load("./swagger.yaml");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use authentication routes
app.use("/auth", authRoutes);

// Close database on server close
process.on("SIGINT", () => {
  db.close((err) => {
    console.log("Database closed");
    process.exit(0);
  });
});
app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to User Authentication API</h1><p>Visit <a href="/api-docs">API Documentation</a> for testing the endpoints.</p>'
  );
});

function startServer(currentPort) {
  const server = app.listen(currentPort, () => {
    console.log(`Server is running on http://localhost:${currentPort}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(
        `Port ${currentPort} is in use, trying port ${currentPort + 1}...`
      );
      startServer(currentPort + 1); // Try the next port
    } else {
      console.error("Server error:", error);
    }
  });
}

// Start the server on the initial port (3000 or the one specified in .env)
startServer(port);
