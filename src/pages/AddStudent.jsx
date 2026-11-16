
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../redux/studentSlice";

function AddStudent({ onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const student = {
      name: form.name,
      username: form.name.split(" ")[0],
      email: form.email,
      phone: form.phone,
      course: form.course,
      address: {
        city: form.city
      }
    };

    try {
      await dispatch(addStudent(student)).unwrap();
      onClose();
    } catch (err) {
      setError("Unable to add student. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">

      <label>Student Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter student name"
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />

      <label>Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        required
      />

      <label>City</label>
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="Enter city"
        required
      />

      <label>Course</label>
      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        required
      >
        <option value="">Select a course</option>
        <option value="Full Stack Development">
          Full Stack Development
        </option>
        <option value="Frontend Development">
          Frontend Development
        </option>
        <option value="Backend Development">
          Backend Development
        </option>
        <option value="Python Programming">
          Python Programming
        </option>
        <option value="Data Science">
          Data Science
        </option>
        <option value="UI/UX Design">
          UI/UX Design
        </option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit">Add Student</button>

    </form>
  );
}

export default AddStudent;
