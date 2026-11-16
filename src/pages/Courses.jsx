
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

function Courses() {
  const { students } = useSelector((state) => state.students);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Python Programming",
    "Data Science",
    "UI/UX Design"
  ];

  const enrolledStudents = students.filter(
    (student) => student.course === selectedCourse
  );

  return (
    <div>
      <h1>Courses</h1>
      <p>Select a course to view enrolled students.</p>

      <div className="courses-container">

        {courses.map((course) => {
          const count = students.filter(
            (student) => student.course === course
          ).length;

          return (
            <div
              className="course-card"
              key={course}
              onClick={() => setSelectedCourse(course)}
            >
              <h3>{course}</h3>
              <p>{count} Students Enrolled</p>
            </div>
          );
        })}

      </div>

      <Modal
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse}
      >
        <div className="enrolled-list">

          {enrolledStudents.length === 0 ? (
            <p>No students enrolled in this course.</p>
          ) : (
            enrolledStudents.map((student) => (
              <div
                className="enrolled-student"
                key={student.id}
              >
                {student.name}
              </div>
            ))
          )}

        </div>
      </Modal>
    </div>
  );
}

export default Courses;
