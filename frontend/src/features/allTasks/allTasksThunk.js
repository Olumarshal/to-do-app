import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
// import { getAllTasks } from './allTasksSlice';

export const getAllTasksThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allTasks;
  let url = `/tasks?page=${page}&status=${searchStatus}&taskType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/tasks/stats');
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
