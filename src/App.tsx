import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tasks from './components/Tasks';
import TasksCreation from './components/TaskCreation';
import { RootState } from './controller/rootReducer';
import { setCurrentPage } from './controller/reducers/pagesReducer';

const style = require('./components/Tasks.css').default;

type TodayWrapperProps = {
  children: React.ReactNode | React.ReactNodeArray;
};

function TodayWrapper({ children }: TodayWrapperProps) {
  return (
    <div className={`${style.wrapper} center`}>
      <div className={style.date}>
        <div className={style.text_full_date}>January 13th, 2021</div>
        <h2>Wednesday</h2>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.currentPage);

  const currentPage = useMemo(() => {
    return () => {
      switch (page) {
        case 'tasks':
          return <Tasks />;
        case 'new_task':
          return <TasksCreation />;
        default: {
          // TODO: replace this with a loading state or an error state
          // eslint-disable-next-line no-console
          console.log('Uh oh: we should be loading here');
          return null;
        }
      }
    };
  }, [page]);

  return (
    <div className="header">
      <button
        type="button"
        className="logo"
        onClick={() => dispatch(setCurrentPage({ page: 'tasks' }))}
      >
        今
      </button>
      <button
        type="button"
        className="menu"
        onClick={() => dispatch(setCurrentPage({ page: 'new_task' }))}
      >
        + Add Task
      </button>
      <TodayWrapper>{currentPage()}</TodayWrapper>
    </div>
  );
}
