
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

// GET: Display all students with registration date
app.get("/api/students", async (req, res) => {
    try {
        const [students] = await db.query(`
            SELECT
                id,
                full_name,
                age,
                course,
                DATE_FORMAT(
                    registration_date,
                    '%Y-%m-%d %H:%i:%s'
                ) AS registration_date
            FROM students
            ORDER BY id DESC
        `);

        res.json(students);

    } catch (error) {
        console.error("Error fetching students:", error);

        res.status(500).json({
            message: "Failed to get students"
        });
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

        if (
            !Number.isInteger(studentAge) ||
            studentAge < 1 ||
            studentAge > 120
        ) {
            return res.status(400).json({
                message: "Please enter a valid age"
            });
        }

        const sql = `
            INSERT INTO students
            (full_name, age, course)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            fullName.trim(),
            studentAge,
            course.trim()
        ]);

        // Get automatically generated registration date
        const [newStudent] = await db.execute(
            `SELECT
                id,
                full_name,
                age,
                course,
                DATE_FORMAT(
                    registration_date,
                    '%Y-%m-%d %H:%i:%s'
                ) AS registration_date
             FROM students
             WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json({
            message: "Student registered successfully",
            student: newStudent[0]
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// Start server
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
        console.error(
            "Database connection failed:",
            error.message
        );
    });
