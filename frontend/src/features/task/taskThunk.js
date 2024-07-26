import { showLoading, hideLoading, getAllTasks } from '../allTasks/allTasksSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './taskSlice';

export const createTaskThunk = async (task, thunkAPI) => {
  try {
    const resp = await customFetch.post('/tasks', task);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteTaskThunk = async (taskId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/tasks/${taskId}`);
    thunkAPI.dispatch(getAllTasks());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editTaskThunk = async ({ taskId, task }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/tasks/${taskId}`, task);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
