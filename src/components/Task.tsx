import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import { setCurrentPage } from '../controller/reducers/pagesReducer';
import { updateTaskAction } from '../controller/reducers/tasksReducer';
import { TaskType } from '../entities/Task';
import CheckboxIcon from './TaskView/icons/checkbox.svg';
import CheckboxCheckedIcon from './TaskView/icons/checkbox_checked.svg';
import { UPDATE_TASK_REQUEST } from '../util/constants';

const style = require('./Task.css').default;

/*
 * Description of function
 */
function Task(props: TaskType) {
  const { id: taskId, taskName, taskDescription, finished } = props;
  const [checked, setChecked] = useState(finished);
  const dispatch = useDispatch();

  const handleOpenTask = () =>
    dispatch(setCurrentPage({ page: 'edit_task', currentTask: taskId }));

  const toggleTaskStatus = () => {
    const updatedTask = {
      ...props,
      finished: !checked,
    };
    // Update store
    dispatch(updateTaskAction({ updatedTask }));
    // Update db
    ipcRenderer.send(UPDATE_TASK_REQUEST, updatedTask);
    // Update component state
    setChecked(!checked);
  };

  return (
    <div className={style.task_wrapper}>
      <button
        type="button"
        className={`plain-button ${style.checked_icon}`}
        onClick={toggleTaskStatus}
      >
        <img
          src={checked ? CheckboxCheckedIcon : CheckboxIcon}
          alt={`checkbox showing that the task is not yet ${
            checked ? 'complete' : 'incomplete'
          }'`}
        />
      </button>
      <button
        type="button"
        tabIndex={0}
        className={`${style.task_item}`}
        onClick={handleOpenTask}
        onKeyDown={() => {}}
      >
        {taskName} {taskDescription !== '' ? `- ${taskDescription}` : ''}
      </button>
    </div>
  );
}

export default Task;
