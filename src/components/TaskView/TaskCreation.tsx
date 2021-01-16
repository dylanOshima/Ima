import * as React from 'react';

const style = require('./TaskView.css').default;
const inputStyle = require('./TaskCreation.css').default;

function NewTaskWrapper() {
  const onSubmit = (e: React.FormEvent) => {
    // TODO: We need to implement this
    e.preventDefault();
    // console.log('Target: ', e.currentTarget.children);
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={onSubmit}>
        <input className={inputStyle.title} placeholder="Untitled Task" />
        <textarea
          className={inputStyle.description}
          name="description"
          placeholder="description"
        />
        <div className={style.input_line}>
          <label htmlFor="task-subtasks">
            Sub Tasks:
            <input type="text" name="subtasks" placeholder="Sub Tasks" />
          </label>
        </div>
        <div className={style.input_line}>
          <label htmlFor="task-links">
            Links:
            <input type="text" name="links" placeholder="Links" />
          </label>
        </div>
        <div className={style.input_line}>
          <label htmlFor="task-notes">
            Notes:
            <input type="text" name="notes" placeholder="Notes" />
          </label>
        </div>
        <button className={style.submit_button} type="submit">
          Start
        </button>
      </form>
    </div>
  );
}

export default NewTaskWrapper;
