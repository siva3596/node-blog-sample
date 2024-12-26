//server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors'); // Import CORS



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware here
app.use(express.json()); // JSON middleware


// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Node.js CRUD API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
