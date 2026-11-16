
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addStudentAPI = async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
};

export const updateStudentAPI = async (id, student) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
};

export const deleteStudentAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
