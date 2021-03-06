import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { useEffect, useRef } from 'react';
import { isPropertyOf, updateValue } from '../../util/TypeUtils';
import {
  addTaskAction,
  editTask,
  TasksStateType,
} from '../../controller/reducers/tasksReducer';
import { setCurrentPage } from '../../controller/reducers/pagesReducer';
import SelectorInput from '../form/SelectorInput';
import { RootState } from '../../controller/rootReducer';
import type { TaskType } from '../../entities/Task';
import {
  UPDATE_TASK_REQUEST,
  GET_TAGS_REPLY,
  GET_TAGS_REQUEST,
} from '../../util/constants';

const style = require('./TaskView.css').default;
const inputStyle = require('./TaskCreation.css').default;

const TASK_PAYLOAD = {
  taskName: '',
  taskDescription: '',
  taskLinks: '',
  tags: [''],
  finished: false,
  value: '10',
  subtasks: null,
  expectedTime: null,
  completed: false,
  dueDate: null,
};

type NewTaskPropType = {
  currentTask?: TaskType;
  handleSwitch?: () => void;
};

/**
 * WARN: The name for each input field has to
 * correspond to the correct field in the state object.
 */
function NewTaskWrapper({ handleSwitch, currentTask }: NewTaskPropType) {
  const tagsRef = useRef<string[]>(currentTask != null ? currentTask.tags : []);
  const dispatch = useDispatch();
  const tasks: TasksStateType = useSelector(
    (state: RootState) => state.taskState
  );

  useEffect(() => {
    // Fetch tags
    ipcRenderer.send(GET_TAGS_REQUEST);
    ipcRenderer.on(GET_TAGS_REPLY, (_, tags: string[]) => {
      tagsRef.current = tags;
    });
  }, []);

  function parseElement<T>(
    el: HTMLInputElement,
    initialTask: T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): null | [keyof T, any] {
    if (el.tagName === 'DIV') {
      const nextEl = el.querySelector('input');
      if (nextEl != null) return parseElement(nextEl, initialTask);
    } else if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      const [field, value] = [el.name, el.value];
      if (isPropertyOf(field, initialTask)) {
        return [field, value];
      }
      // eslint-disable-next-line no-console
      throw new Error(
        `${field} is not a valid property in the initial task: ${JSON.stringify(
          initialTask
        )}`
      );
    }
    return null;
  }

  function fetchElementData<T>(elements: HTMLCollection, initialTask: T): T {
    let task = { ...initialTask };
    // Parse each input element
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLInputElement;
      const val = parseElement(el, initialTask);
      if (val != null) task = updateValue(val[0], val[1], task);
    }
    return task;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const elements = e.currentTarget.children;
    let task;
    if (currentTask != null) {
      task = fetchElementData(elements, currentTask);
      // Update store
      dispatch(editTask(task));
      // Update db
      ipcRenderer.send(UPDATE_TASK_REQUEST, task);
    } else {
      task = fetchElementData(elements, TASK_PAYLOAD);
      // Update store
      dispatch(addTaskAction(task));
    }
    // Update page
    dispatch(setCurrentPage({ page: 'tasks' }));
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={onSubmit}>
        <input
          className={inputStyle.title}
          name="taskName"
          placeholder="Untitled Task"
          defaultValue={currentTask?.taskName}
        />
        <textarea
          className={inputStyle.description}
          name="taskDescription"
          placeholder="What does it mean for this task to be completed?"
          defaultValue={currentTask?.taskDescription}
        />
        <div className={inputStyle.input_line}>
          <label htmlFor="value">
            Bounty:
            <input
              className={inputStyle.short_input}
              type="number"
              name="value"
              placeholder="0"
              defaultValue={currentTask?.value}
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
              defaultValue={currentTask?.expectedTime ?? undefined}
            />
            minutes
          </label>
        </div>
        <SelectorInput
          className="form-input"
          label="Sub Tasks:"
          type="text"
          name="subtasks"
          placeholder="Sub Tasks"
          options={tasks.map((t) => t.taskName)}
        />
        <SelectorInput
          className="form-input"
          label="Tags:"
          type="text"
          name="tags"
          placeholder={tagsRef.current.join(', ')}
          options={tagsRef.current}
        />
        <div className={inputStyle.input_line}>
          <label htmlFor="task-links">
            Links:
            <input
              className="form-input"
              type="text"
              name="taskLinks"
              placeholder="Links"
            />
          </label>
        </div>
        {/* <div className={inputStyle.input_line}>
          <label htmlFor="task-notes">
            Notes:
            <input type="text" name="notes" placeholder="Notes" />
          </label>
        </div> */}
        <div>
          <button className={inputStyle.submit_button} type="submit">
            {handleSwitch != null ? 'Update' : 'Submit'}
          </button>
          {handleSwitch != null ? (
            <button
              className={inputStyle.edit_button}
              type="button"
              onClick={handleSwitch}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

NewTaskWrapper.defaultProps = {
  currentTask: null,
  handleSwitch: null,
};

export default NewTaskWrapper;
