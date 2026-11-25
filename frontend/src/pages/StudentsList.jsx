
import { useEffect, useState } from "react";

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/students")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load students");
                }
                return response.json();
            })
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredStudents = students.filter((student) =>
        student.full_name.toLowerCase().includes(search.toLowerCase()) ||
        student.course.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="students-container">

            <div className="students-header">
                <h1>Students Management</h1>
                <p>View and manage all registered students.</p>
            </div>

            <div className="students-summary">
                <h3>Total Registered Students</h3>
                <h2>{students.length}</h2>
            </div>

            <div className="students-table-section">

                <div className="table-heading">
                    <h2>Students List</h2>

                    <input
                        type="text"
                        placeholder="Search by name or course..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                {loading && <p>Loading students...</p>}

                {error && <p className="error">{error}</p>}

                {!loading && !error && (
                    <div className="table-responsive">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Age</th>
                                    <th>Course</th>
                                    <th>Registration Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.full_name}</td>
                                        <td>{student.age}</td>

                                        <td>
                                            <span className="course-badge">
                                                {student.course}
                                            </span>
                                        </td>

                                        {/* Registration Date */}
                                        <td>
                                            {student.registration_date
                                                ? new Date(
                                                    student.registration_date.replace(" ", "T")
                                                ).toLocaleString()
                                                : "No Date"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <p className="no-students">
                                No students found.
                            </p>
                        )}
                    </div>
                )}

            </div>

        </div>
    );
}

export default StudentsList;
