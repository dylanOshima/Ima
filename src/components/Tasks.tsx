import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';
import { RootState } from '../controller/rootReducer';
import { TaskType } from '../controller/reducers/tasksReducer';

const style = require('./Tasks.css').default;

function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className={style.tasks}>
      <div className={style.task_header}>Today's Tasks:</div>
      <div className={style.task_list}>
        {tasks.length !== 0 ? (
          tasks.map((task: TaskType) => <Task key={task.taskName} {...task} />)
        ) : (
          <div className={style.empty_text}>
            <i>You have no tasks at the moment</i>{' '}
            <span role="img" aria-label="you should go enjoy life">
              🥳
            </span>
            !
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
