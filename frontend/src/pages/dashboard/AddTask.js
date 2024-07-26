import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  createTask,
  editTask,
} from '../../features/task/taskSlice';
// import { useEffect } from 'react';
const AddTask = () => {
  const {
    isLoading,
    title,
    description,
    due_date,
    status,
    statusOptions,
    isEditing,
    editTaskId,
  } = useSelector((store) => store.task);
  // const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !due_date) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editTask({
          taskId: editTaskId,
          task: { title, description, due_date, status },
        })
      );
      return;
    }
    dispatch(createTask({ title, description, due_date, status }));
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(
  //       handleChange({
  //         name: 'jobLocation',
  //         value: user.location,
  //       })
  //     );
  //   }
  // }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit task' : 'add task'}</h3>
        <div className='form-center'>
          {/* title */}
          <FormRow
            type='text'
            name='title'
            value={title}
            handleChange={handleTaskInput}
          />
          {/* description */}
          <FormRow
            type='text'
            name='description'
            value={description}
            handleChange={handleTaskInput}
          />
          {/* due date */}
          <FormRow
            type='text'
            name='due_date'
            labelText='due date'
            value={due_date}
            handleChange={handleTaskInput}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleTaskInput}
            list={statusOptions}
          />
         
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddTask;
