import * as React from 'react';
import { isPropertyOf, updateValue } from '../../util/TypeUtils';
import {
  TaskType,
  INITIAL_TASK_STATE,
} from '../../controller/reducers/tasksReducer';

const style = require('./TaskView.css').default;
const inputStyle = require('./TaskCreation.css').default;

function NewTaskWrapper() {
  function parseElement(
    el: HTMLInputElement
  ): null | [keyof TaskType, TaskType[keyof TaskType]] {
    if (el.tagName === 'DIV') {
      const nextEl = el.querySelector('input');
      if (nextEl != null) return parseElement(nextEl);
    } else if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      const [field, value] = [el.name, el.value];
      if (isPropertyOf(field, INITIAL_TASK_STATE)) {
        return [field, value];
      }
    }
    return null;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let task: TaskType = INITIAL_TASK_STATE;
    const elements = e.currentTarget.children;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLInputElement;
      const val = parseElement(el);
      if (val != null) {
        task = updateValue(val[0], val[1], task);
      }
    }
    // alert('Submitting.... ');
    // console.log(task);
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={onSubmit}>
        <input
          className={inputStyle.title}
          name="taskName"
          placeholder="Untitled Task"
        />
        <textarea
          className={inputStyle.description}
          name="taskDescription"
          placeholder="description"
        />
        <div className={inputStyle.input_line}>
          <label htmlFor="value">
            Bounty:
            <input
              className={inputStyle.short_input}
              type="number"
              name="value"
              placeholder="0"
            />
            lumen
          </label>
        </div>
        <div className={inputStyle.input_line}>
          <label htmlFor="duration">
            Est. Duration:
            <input
              className={inputStyle.short_input}
              type="number"
              name="expectedTime"
              placeholder="30"
            />
            minutes
          </label>
        </div>
        <div className={inputStyle.input_line}>
          <label htmlFor="task-subtasks">
            Sub Tasks:
            <input type="text" name="subtasks" placeholder="Sub Tasks" />
          </label>
        </div>
        <div className={inputStyle.input_line}>
          <label htmlFor="task-links">
            Links:
            <input type="text" name="taskLinks" placeholder="Links" />
          </label>
        </div>
        {/* <div className={inputStyle.input_line}>
          <label htmlFor="task-notes">
            Notes:
            <input type="text" name="notes" placeholder="Notes" />
          </label>
        </div> */}
        <button className={inputStyle.submit_button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewTaskWrapper;
