const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Atlas connection details
const mongoURI = "mongodb+srv://vkasireddy1:nEK05zFurqNgXF20@cs4241.hl2vl.mongodb.net/?retryWrites=true&w=majority&appName=CS4241";
const dbName = "workout_tracker";

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

let db, usersCollection, exercisesCollection;

// Connect to MongoDB Atlas
MongoClient.connect(mongoURI)
    .then(client => {
        db = client.db(dbName);
        usersCollection = db.collection("users");
        exercisesCollection = db.collection("exercises");
        console.log("Connected to MongoDB Atlas");
    })
    .catch(error => console.error("MongoDB connection error:", error));

// Serve main page
app.get("/", (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    } else {
        res.redirect("/login");
    }
});

// Serve login and registration pages
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));

// Register user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) return res.status(400).send("Username already exists");

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({ username, password: hashedPassword });

    req.session.authenticated = true;
    req.session.userId = result.insertedId.toString(); // Store user ID as string
    res.redirect("/");
});


// Login user
// Login user
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username });

    // If user doesn't exist or passwords don't match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid username or password");
    }

    // Correct password, set session variables
    req.session.authenticated = true;
    req.session.userId = user._id.toString(); // Store user ID as string

    console.log(`User ${username} logged in successfully`);

    // Redirect to main page
    res.redirect("/"); // Redirect to main page
});


// Check authentication status
app.get("/check-auth", (req, res) => {
    res.json({ authenticated: req.session.authenticated || false });
});

// Get exercises for logged-in user
app.get("/data", async (req, res) => {
    if (!req.session.authenticated) return res.status(401).send("User not authenticated");

    const exercises = await exercisesCollection.find({ userId: req.session.userId }).toArray(); // Use string comparison
    res.json(exercises);
});

// Add a new exercise
app.post("/add", async (req, res) => {
    if (!req.session.authenticated) return res.status(401).send("User not authenticated");

    const { name, duration, notes } = req.body;
    const newExercise = { name, duration, notes, userId: req.session.userId }; // Store userId as string

    const result = await exercisesCollection.insertOne(newExercise);
    res.json({ ...newExercise, _id: result.insertedId });
});

// Delete an exercise
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await exercisesCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send("Exercise deleted");
});

// Update an exercise
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, duration, notes } = req.body;

    const updatedExercise = await exercisesCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { name, duration, notes } },
        { returnDocument: "after" }
    );

    res.json(updatedExercise.value);
});

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
