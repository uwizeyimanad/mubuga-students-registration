
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName,
                        age,
                        course
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMessage(data.message);

            setFullName("");
            setAge("");
            setCourse("");

            setTimeout(() => {
                navigate("/students");
            }, 1000);

        } catch (error) {
            setError(error.message || "Something went wrong");
        }
    };

    return (
        <div className="form-container">
            <h1>Student Registration</h1>

            <form onSubmit={handleSubmit}>

                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <label>Age</label>
                <input
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="120"
                    required
                />

                <label>Select Course</label>
                <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                >
                    <option value="">-- Select Course --</option>
                    <option value="Software Development">
                        Software Development
                    </option>
                    <option value="Computer Systems">
                        Computer Systems
                    </option>
                    <option value="Networking">
                        Networking
                    </option>
                    <option value="Business Management">
                        Business Management
                    </option>
                    <option value="Accounting">
                        Accounting
                    </option>
                </select>

                <button type="submit">
                    Register Student
                </button>

            </form>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
