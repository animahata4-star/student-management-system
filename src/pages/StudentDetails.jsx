
function StudentDetails({ student }) {
  return (
    <div className="student-details">

      <p><strong>ID:</strong> {student.id}</p>

      <p><strong>Name:</strong> {student.name}</p>

      <p><strong>Username:</strong> {student.username}</p>

      <p><strong>Email:</strong> {student.email}</p>

      <p><strong>Phone:</strong> {student.phone}</p>

      <p><strong>City:</strong> {student.address?.city}</p>

      <p><strong>Website:</strong> {student.website}</p>

    </div>
  );
}

export default StudentDetails;
