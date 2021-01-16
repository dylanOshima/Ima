import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';

const style = require('./TaskView.css').default;

function TaskView() {
  const { id, taskName } = useSelector((state: RootState) => {
    const { currentTask } = state.currentPage;
    return state.tasks[currentTask];
  });

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{taskName}</h1>
      <div className={style.body}>We lookin' at the current task: {id}</div>
    </div>
  );
}

export default TaskView;
