import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Task';
import { useDispatch } from 'react-redux';
import TaskInfo from './TaskInfo';
import moment from 'moment';
import { deleteTask, setEditTask } from '../features/task/taskSlice';
const Task = ({ id, title, description, due_date, status, createdAt }) => {
  const dispatch = useDispatch();

  const date = moment(createdAt, due_date).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{due_date}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<FaLocationArrow />} text={title} />
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          <TaskInfo icon={<FaBriefcase />} text={description} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-task"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditTask({
                    editTaskId: id,
                    description,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteTask(id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Task;
