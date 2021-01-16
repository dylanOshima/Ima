import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';

const style = require('./TaskView.css').default;

function TaskView() {
  const { taskName } = useSelector((state: RootState) => {
    const { currentTask } = state.currentPage;
    return state.tasks[currentTask];
  });

  const onSubmit = () => {
    // TODO: This is for updating an existing task
    // console.log("Hello, whatcha submittin' there?");
  };

  return (
    <div className={style.wrapper}>
      <form className={style.body} onSubmit={onSubmit}>
        <h1 className={style.title}>{taskName}</h1>
        <div className={style.description_section}>
          <label htmlFor="task-description">
            <textarea
              className={style.task_description}
              id="task-description"
              placeholder="description"
            />
          </label>
        </div>
        <div>
          <div className={style.input_short}>
            <label htmlFor="task-value">
              Bounty:
              <input type="number" id="task-value" placeholder="0" />
            </label>
          </div>
          <div className={style.input_short}>
            <label htmlFor="task-duration">
              Duration:
              <input type="number" id="task-duration" placeholder="0" />
            </label>
          </div>
        </div>
        <div className={style.input_line}>
          <label htmlFor="task-subtasks">
            Sub Tasks:
            <input type="text" id="task-subtasks" placeholder="Sub Tasks" />
          </label>
        </div>
        <div className={style.input_line}>
          <label htmlFor="task-links">
            Links:
            <input type="text" id="task-links" placeholder="Links" />
          </label>
        </div>
        <div className={style.input_line}>
          <label htmlFor="task-notes">
            Notes:
            <input type="text" id="task-notes" placeholder="Notes" />
          </label>
        </div>
        <button
          className={style.submit_button}
          type="submit"
          onClick={onSubmit}
        >
          Start
        </button>
      </form>
    </div>
  );
}

export default TaskView;
