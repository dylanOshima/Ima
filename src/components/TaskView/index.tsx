import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';
import CheckBox from './icons/checkbox.svg';
import CheckBoxChecked from './icons/checkbox_checked.svg';
import TrashIcon from './icons/trash.svg';
import TrashIconHovered from './icons/trash-opened.svg';
import TaskCreation from './TaskCreation';
import { deleteTask } from '../../controller/reducers/tasksReducer';
import { setCurrentPage } from '../../controller/reducers/pagesReducer';
import type { TaskType } from '../../entities/Task';

const style = require('./TaskView.css').default;

type TaskViewType = TaskType & {
  handleSwitch?: () => void;
};

function TaskView({ handleSwitch, ...currentTask }: TaskViewType) {
  const [isTrashHovered, setIsTrashHovered] = useState(false);
  const dispatch = useDispatch();
  const {
    id,
    taskName,
    taskDescription,
    taskLinks,
    subtasks,
    value,
    finished,
    expectedTime,
  } = currentTask;

  const handleTrashClick = () => {
    dispatch(deleteTask(id));
    dispatch(setCurrentPage({ page: 'tasks' }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <img
          className={style.checkbox}
          src={finished ? CheckBoxChecked : CheckBox}
          alt="checkbox"
        />
        <h1 className={style.title}>{taskName}</h1>
        <button
          className="plain-button"
          type="button"
          onClick={handleTrashClick}
        >
          <img
            className={style.trashcan}
            src={isTrashHovered ? TrashIconHovered : TrashIcon}
            alt="trashcan for deleting"
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
          />
        </button>
      </div>
      <div className={style.description}>
        <p>{taskDescription}</p>
      </div>
      <div className={style.input_line}>
        <span className={style.input_short}>Bounty: {value} lumens</span>
      </div>
      <div className={style.input_line}>
        <span className={style.input_short}>
          Duration: {expectedTime == null ? 0 : expectedTime} minutes
        </span>
      </div>
      <div className={style.input_line}>
        <span>
          Sub Tasks:{' '}
          {subtasks == null || subtasks.length === 0
            ? 'None'
            : JSON.stringify(subtasks)}
        </span>
      </div>
      <div className={style.input_line}>
        <span>
          Links:
          {taskLinks}
        </span>
      </div>
      <div className={style.button_group}>
        <button
          className={style.submit_button}
          type="submit"
          onClick={() => console.log('start!')}
        >
          Start
        </button>
        <button
          className={style.edit_button}
          type="button"
          onClick={handleSwitch}
        >
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

TaskView.defaultProps = {
  handleSwitch: null,
};

function TaskWrapper() {
  const [editTask, setEditTask] = useState(false);

  const task = useSelector((state: RootState) => {
    const { currentTask } = state.pageState;
    return state.taskState.filter((t: TaskType) => t.id === currentTask);
  });

  if (task.length === 0)
    throw new Error(
      `Something odd has occurred, no tasks were found related to the selected task.`
    );

  return editTask ? (
    <TaskCreation
      currentTask={task.pop()}
      handleSwitch={() => setEditTask(false)}
    />
  ) : (
    <TaskView {...task.pop()} handleSwitch={() => setEditTask(true)} />
  );
}

export default TaskWrapper;
