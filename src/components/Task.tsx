import * as React from 'react';

const style = require('./Task.css').default;

type TaskType = {
  taskName: string;
  taskDescription: string;
  // taskLinks: string[];
  // subtasks: TaskType[];
  // value?: number;
  // dueDate: Date | null | undefined;
  // expectedTime?: number;
  finished: boolean;
};

/*
 * Description of function
 */
function Task(props: TaskType) {
  const { taskName, taskDescription, finished } = props;

  return (
    <div className={style.task_wrapper}>
      <a className={style.task} href="/">
        <input
          className={style.task_checkbox}
          type="checkbox"
          defaultChecked={finished}
          readOnly
        />
        <span>
          {taskName} - {taskDescription}
        </span>
      </a>
    </div>
  );
}

export default Task;
