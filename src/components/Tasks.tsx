import React from 'react';
import Task from './Task';

const style = require('./Tasks.css').default;

const DATA = [
  {
    taskName: 'Finish figma mockups',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
  },
  {
    taskName: 'Create persistant storage',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
  },
  {
    taskName: 'Turn these into react components',
    taskDescription: 'A really sexy task',
    finished: true,
    taskLinks: [],
    subtasks: [],
  },
];

function Tasks() {
  return (
    <div className={`${style.wrapper} center`}>
      <div className={style.date}>
        <div className={style.text_full_date}>January 13th, 2021</div>
        <h2>Wednesday</h2>
      </div>
      <div className={style.tasks}>
        <div className={style.task_header}>Today's Tasks:</div>
        <div className={style.task_list}>
          {DATA.map((task) => (
            <Task key={task.taskName} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
