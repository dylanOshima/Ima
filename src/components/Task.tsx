import * as React from 'react';
import { useState } from 'react';

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
  const [checked, setChecked] = useState(finished);

  return (
    <div className={style.task} onClick={() => setChecked(!checked)}>
      <input
        className={style.task_checkbox}
        type="checkbox"
        checked={checked}
      />
      <span>
        {taskName} - {taskDescription}
      </span>
    </div>
  );
}

export default Task;
