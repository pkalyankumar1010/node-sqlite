require("dotenv").config();
const express = require("express");
const authRoutes = require("../routes/authRoutes");
const YAML = require("yamljs");
const db = require("../models/userModel"); // Import the database setup
const swaggerUi = require("swagger-ui-express");
const app = express();
const cors = require("cors");
const path = require("path");
// const port = process.env.PORT || 3000;
let port = parseInt(process.env.PORT, 10) || 3000;
// Load Swagger YAML file
// After adding path.join , the app delpoyed correctly in vercel but in local deployment everthing was working fine , still api doc is not opeening beacuse of console sagger error
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use Swagger UI
const swaggerUiDistPath = require("swagger-ui-dist").getAbsoluteFSPath();
app.use("/api-docs", express.static(swaggerUiDistPath)); // Serve Swagger UI assets
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true, // Optional: Enables the search bar in Swagger UI
  customCssUrl: "/swagger-ui/swagger-ui.css",
}));

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

module.exports = app; // Export the app for Vercel serverless function

// Start the server on the initial port (3000 or the one specified in .env)
startServer(port);
