import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './features/task/taskSlice';
import userSlice from './features/user/userSlice';
import allTasksSlice from './features/allTasks/allTasksSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
    allTasks: allTasksSlice,
  },
});
