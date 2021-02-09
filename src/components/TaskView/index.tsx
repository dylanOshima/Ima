import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../controller/rootReducer';
import TaskCreation from './TaskCreation';
import TaskView from './TaskView';
import type { TaskType } from '../../entities/Task';

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
