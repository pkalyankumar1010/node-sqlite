const express = require('express');
const authRoutes = require('./routes/authRoutes');
const YAML = require('yamljs');
const db = require('./models/userModel');  // Import the database setup
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

// Load Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware to parse JSON
app.use(express.json());

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use authentication routes
app.use('/auth', authRoutes);

// Close database on server close
process.on('SIGINT', () => {
  db.close((err) => {
    console.log('Database closed');
    process.exit(0);
  });
});
app.get('/', (req, res) => {
    res.send('<h1>Welcome to User Authentication API</h1><p>Visit <a href="/api-docs">API Documentation</a> for testing the endpoints.</p>');

  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
