import electron from 'electron';
import path from 'path';
import fs from 'fs';
import {
  initialState,
  TasksStateType,
} from '../controller/reducers/tasksReducer';

type StoreType = {
  configName: string;
};

function parseDataFile<T>(filePath: string, defaultVal: T): T {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    const buff = fs.readFileSync(filePath);
    return JSON.parse(buff.toString());
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaultVal;
  }
}

class TasksStore {
  path: string;

  data: TasksStateType;

  constructor(opts: StoreType) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );

    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, `${opts.configName}.json`);

    this.data = parseDataFile(this.path, initialState);
  }

  // This will just return the property on the `data` object
  get() {
    return this.data;
  }

  // ...and this will set it
  set(newData: TasksStateType) {
    this.data = newData;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

// expose the class
export default TasksStore;
