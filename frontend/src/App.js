import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Landing, Error, Signup, ProtectedRoute } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  AddTask,
  AllTasks,
  Stats,
  SharedLayout,
} from './pages/dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-tasks' element={<AllTasks />} />
          <Route path='add-task' element={<AddTask />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}

export default App;
