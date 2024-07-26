import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createTaskThunk, deleteTaskThunk, editTaskThunk } from './taskThunk';

const initialState = {
  isLoading: false,
  title: '',
  description: '',
  due_date: '',
  statusOptions: ['pending', 'completed'],
  status: 'pending',
  isEditing: false,
  editTaskId: '',
};

export const createTask = createAsyncThunk('task/createTask', createTaskThunk);
export const deleteTask = createAsyncThunk('task/deleteTask', deleteTaskThunk);
export const editTask = createAsyncThunk('task/editTask', editTaskThunk);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setEditTask: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Task Created');
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Task Modified');
      })
      .addCase(editTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditTask } = taskSlice.actions;
export default taskSlice.reducer;
