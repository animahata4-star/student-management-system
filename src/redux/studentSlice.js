
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getStudents,
  addStudentAPI,
  updateStudentAPI,
  deleteStudentAPI
} from "../services/studentService";

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    return await getStudents();
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await addStudentAPI(student);

    return {
      ...response,
      ...student,
      id: Date.now()
    };
  }
);

// Update student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, student }) => {
    await updateStudentAPI(id, student);
    return { ...student, id };
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await deleteStudentAPI(id);
    return id;
  }
);

const studentSlice = createSlice({
  name: "students",

  initialState: {
    students: [],
    recentStudents: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })

      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);

        state.recentStudents.unshift(action.payload);

        // Show only latest 5 students
        state.recentStudents = state.recentStudents.slice(0, 5);
      })

      // Edit student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s.id === action.payload.id
        );

        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })

      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (s) => s.id !== action.payload
        );

        state.recentStudents = state.recentStudents.filter(
          (s) => s.id !== action.payload
        );
      });
  }
});

export default studentSlice.reducer;
