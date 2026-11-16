
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { fetchStudents } from "../redux/studentSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { students, recentStudents, loading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {isDashboardHome ? (
            <>
              <h1>Dashboard</h1>
              <p>Welcome to Student Management System.</p>

              {/* Total Students */}
              <div className="dashboard-card">
                <h3>Total Students</h3>

                <h1>
                  {loading ? "Loading..." : error ? "--" : students.length}
                </h1>

                {error && <p className="error">{error}</p>}
              </div>

              {/* Recently Added Students */}
              <div className="recent-students">
                <div className="recent-header">
                  <h2>Recently Added Students</h2>

                  <button onClick={() => navigate("/dashboard/students")}>
                    View All
                  </button>
                </div>

                {recentStudents.length === 0 ? (
                  <p className="empty-message">
                    No recently added students. Add a student to see them here.
                  </p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.phone}</td>
                          <td>{student.address?.city || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
