import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/students")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load students");
                }
                return response.json();
            })
            .then((data) => {
                setTotalStudents(data.length);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="dashboard">

            <div className="welcome-section">
                <h1>Welcome to Mubuga TSS</h1>
                <p>Student Registration Management System</p>
                <p>Manage student information easily and efficiently.</p>
            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card students-card">
                    <div className="card-icon">👨‍🎓</div>
                    <h3>Total Students</h3>
                    <h2>{loading ? "Loading..." : totalStudents}</h2>
                    <p>Registered students</p>
                </div>

                <div className="dashboard-card register-card">
                    <div className="card-icon">📝</div>
                    <h3>Registration</h3>
                    <p>Add a new student to the system.</p>
                    <Link to="/register" className="dashboard-btn">
                        Register Student
                    </Link>
                </div>

                <div className="dashboard-card list-card">
                    <div className="card-icon">📋</div>
                    <h3>Students List</h3>
                    <p>View all registered students.</p>
                    <Link to="/students" className="dashboard-btn">
                        View Students
                    </Link>
                </div>

            </div>

            <div className="dashboard-footer">
                <p>© 2026 Mubuga TSS | Student Management System</p>
            </div>

        </div>
    );
}

export default Home;