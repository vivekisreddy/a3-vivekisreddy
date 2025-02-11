const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");  // For handling session-based authentication
const bcrypt = require("bcrypt");  // For password hashing

// Set up the Express app
const app = express();
const port = 3000;

// MongoDB Connection (Updated)
mongoose.connect("mongodb://localhost:27017/exercisesdb")
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Define the exercise schema (including notes field)
const exerciseSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    notes: String,  // Adding a notes field for extra information
});

// Create Exercise model
const Exercise = mongoose.model("Exercise", exerciseSchema);

// Define the user schema (for registration and login)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create User model
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware to manage login state
app.use(session({
    secret: 'your-secret-key', // Change to a secure key
    resave: false,
    saveUninitialized: true,
}));

// GET route to serve the index.html (main page)
app.get("/", (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    } else {
        res.redirect("/login"); // Redirect to login if not authenticated
    }
});

// Login page route
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Registration page route
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// POST route to handle registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send("Username already exists");
    }

    // Hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        req.session.authenticated = true; // Set session as authenticated
        res.redirect("/");  // Redirect to main page after successful registration
    } catch (err) {
        res.status(500).send("Error creating user");
    }
});

// POST route to handle login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send("Invalid username or password");
    }

    req.session.authenticated = true; // Set session as authenticated
    res.redirect("/");  // Redirect to main page if login is successful
});

// GET route to check authentication status
app.get("/check-auth", (req, res) => {
    if (req.session.authenticated) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// GET route to fetch all exercises
app.get("/data", async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises); // Return the list of exercises
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add new exercises
app.post("/add", async (req, res) => {
    const { name, duration, notes } = req.body;

    const exercise = new Exercise({
        name,
        duration,
        notes,  // Including notes in the new exercise data
    });

    try {
        const savedExercise = await exercise.save();
        res.status(201).json(savedExercise); // Return the saved exercise object
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to delete an exercise by ID
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExercise = await Exercise.findByIdAndDelete(id);
        if (!deletedExercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(200).json(deletedExercise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT route to update an exercise by ID
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, duration, notes } = req.body;  // Including notes in update data

    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            { name, duration, notes }, // Update all fields including notes
            { new: true }
        );
        if (!updatedExercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(200).json(updatedExercise); // Return updated exercise data
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});