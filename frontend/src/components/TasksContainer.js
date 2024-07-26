import { useEffect } from 'react';
import Task from './Task';
import Wrapper from '../assets/wrappers/TasksContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllTasks } from '../features/allTasks/allTasksSlice';
import PageBtnContainer from './PageBtnContainer';
const TasksContainer = () => {
  const {
    tasks,
    isLoading,
    page,
    totalTasks,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch, page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTasks} task{tasks.length > 1 && 's'} found
      </h5>
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default TasksContainer;
