import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTasksThunk, showStatsThunk } from './allTasksThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  tasks: [],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllTasks = createAsyncThunk('allTasks/getTasks', getAllTasksThunk);
export const showStats = createAsyncThunk('allTasks/showStats', showStatsThunk);

const allTasksSlice = createSlice({
  name: 'allTasks',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => ({
      ...state,
      ...initialFiltersState,
    }),
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllTasksState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload.tasks;
        state.numOfPages = payload.numOfPages;
        state.totalTasks = payload.totalTasks;
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllTasksState,
} = allTasksSlice.actions;
export default allTasksSlice.reducer;
