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
        {tasks.map((task: TaskType) => (
          <Task key={task.taskName} {...task} />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
