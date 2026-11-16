
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";

import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import StudentDetails from "./StudentDetails";

import { deleteStudent } from "../redux/studentSlice";

function Students() {
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector(
    (state) => state.students
  );

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  const [modalType, setModalType] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (type, student = null) => {
    setModalType(type);
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedStudent(null);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteStudent(selectedStudent.id)).unwrap();
      closeModal();
    } catch (err) {
      alert("Unable to delete student");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCity = city === "" || student.address.city === city;

    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(students.map((s) => s.address.city))];

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Students</h1>
          <p>Manage all your students here.</p>
        </div>

        <button onClick={() => openModal("add")}>
          + Add Student
        </button>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>

          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading students...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.address.city}</td>

                  <td className="actions">
                    <button
                      className="view-btn"
                      onClick={() => openModal("view", student)}
                    >
                      View
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => openModal("edit", student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openModal("delete", student)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={modalType !== ""}
        onClose={closeModal}
        title={
          modalType === "add" ? "Add Student" :
          modalType === "edit" ? "Edit Student" :
          modalType === "view" ? "Student Details" :
          "Delete Student"
        }
      >
        {modalType === "add" && (
          <AddStudent onClose={closeModal} />
        )}

        {modalType === "edit" && selectedStudent && (
          <EditStudent
            student={selectedStudent}
            onClose={closeModal}
          />
        )}

        {modalType === "view" && selectedStudent && (
          <StudentDetails student={selectedStudent} />
        )}

        {modalType === "delete" && selectedStudent && (
          <div>
            <p>
              Are you sure you want to delete {selectedStudent.name}?
            </p>

            <div className="modal-actions">
              <button onClick={closeModal}>Cancel</button>

              <button className="delete-btn" onClick={handleDelete}>
                Confirm Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Students;
