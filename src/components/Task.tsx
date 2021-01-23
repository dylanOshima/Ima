import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../controller/reducers/pagesReducer';
import { TaskType } from '../controller/reducers/tasksReducer';

const style = require('./Task.css').default;

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
