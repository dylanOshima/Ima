import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';
import CheckBox from './checkbox.svg';
import CheckBoxChecked from './checkbox_checked.svg';
import TaskCreation from './TaskCreation';
import { TaskType } from '../../controller/reducers/tasksReducer';

const style = require('./TaskView.css').default;

type TaskViewType = TaskType & {
  handleSwitch?: () => void;
};

function TaskView({ handleSwitch, ...currentTask }: TaskViewType) {
  const {
    taskName,
    taskDescription,
    taskLinks,
    subtasks,
    value,
    finished,
    expectedTime,
  } = currentTask;

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <img
          className={style.checkbox}
          src={finished ? CheckBoxChecked : CheckBox}
          alt="checkbox"
        />
        <h1 className={style.title}>{taskName}</h1>
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
          Sub Tasks: {subtasks.length === 0 ? 'None' : JSON.stringify(subtasks)}
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
    return state.taskState[currentTask];
  });

  return editTask ? (
    <TaskCreation currentTask={task} handleSwitch={() => setEditTask(false)} />
  ) : (
    <TaskView {...task} handleSwitch={() => setEditTask(true)} />
  );
}

export default TaskWrapper;
