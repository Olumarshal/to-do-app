import { useEffect } from 'react';
import { StatsContainer, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allTasks/allTasksSlice';

const Stats = () => {
  const { weeklyTasks } = useSelector(
    (store) => store.allTasks
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);
  return (
    <>
      <StatsContainer />
      {weeklyTasks.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
