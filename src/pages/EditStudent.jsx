
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudent } from "../redux/studentSlice";

function EditStudent({ student, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone || "",
    city: student.address?.city || "",
    course: student.course || ""
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

    const updatedStudent = {
      ...student,
      name: form.name,
      email: form.email,
      phone: form.phone,
      course: form.course,
      address: {
        ...student.address,
        city: form.city
      }
    };

    try {
      await dispatch(
        updateStudent({
          id: student.id,
          student: updatedStudent
        })
      ).unwrap();

      onClose();
    } catch (err) {
      setError("Unable to update student. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">

      <label>Student Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label>Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <label>City</label>
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
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

      <button type="submit">Update Student</button>

    </form>
  );
}

export default EditStudent;
