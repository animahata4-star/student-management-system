
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">SMS</h2>

      <NavLink to="/dashboard" end>
        Dashboard
      </NavLink>

      <NavLink to="/dashboard/students">
        Students
      </NavLink>

      <NavLink to="/dashboard/courses">
        Courses
      </NavLink>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
