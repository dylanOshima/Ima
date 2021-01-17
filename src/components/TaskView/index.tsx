import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';
import CheckBox from './checkbox.svg';
import CheckBoxChecked from './checkbox_checked.svg';

const style = require('./TaskView.css').default;

function TaskView() {
  const {
    taskName,
    taskDescription,
    taskLinks,
    subtasks,
    value,
    finished,
    expectedTime,
  } = useSelector((state: RootState) => {
    const { currentTask } = state.currentPage;
    return state.tasks[currentTask];
  });

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
          onClick={() => console.log(expectedTime)}
        >
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default TaskView;
