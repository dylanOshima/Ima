import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../controller/reducers/pagesReducer';

const style = require('./Task.css').default;

type TaskType = {
  id: number;
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
function Task({ id: taskId, taskName, taskDescription, finished }: TaskType) {
  const dispatch = useDispatch();

  return (
    <div
      role="button"
      tabIndex={0}
      className={style.task_wrapper}
      onClick={() =>
        dispatch(setCurrentPage({ page: 'edit_task', currentTask: taskId }))
      }
      onKeyDown={(e) => e.key === 'ArrowDown'}
    >
      <input
        className={style.task_checkbox}
        type="checkbox"
        defaultChecked={finished}
        readOnly
      />
      <span>
        {taskName} - {taskDescription}
      </span>
    </div>
  );
}

export default Task;
