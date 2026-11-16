
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Test backend
app.get("/", (req, res) => {
    res.send("Student Registration API is running");
});

// GET: Display all students
app.get("/api/students", async (req, res) => {
    try {
        const [students] = await db.query(
            "SELECT * FROM students ORDER BY id DESC"
        );

        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get students" });
    }
});

// POST: Register a new student
app.post("/api/students", async (req, res) => {
    try {
        const { fullName, age, course } = req.body;

        if (!fullName || !age || !course) {
            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        const studentAge = Number(age);

        if (!Number.isInteger(studentAge) || studentAge < 1 || studentAge > 120) {
            return res.status(400).json({
                message: "Please enter a valid age"
            });
        }

        const sql = `
            INSERT INTO students (full_name, age, course)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            fullName.trim(),
            studentAge,
            course
        ]);

        res.status(201).json({
            message: "Student registered successfully",
            studentId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// Start server after testing database connection
const PORT = process.env.PORT || 5000;

db.getConnection()
    .then((connection) => {
        console.log("MySQL database connected successfully!");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });
