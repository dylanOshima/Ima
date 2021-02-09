import electron from 'electron';
import path from 'path';
import {
  Connection,
  IDatabaseDriver,
  MikroORM,
  EntityManager,
  wrap,
} from '@mikro-orm/core';
import Task, { TaskType } from '../entities/Task';

type StoreType = {
  storageFolderName: string;
};

class Database {
  path: string;

  private db?: MikroORM<IDatabaseDriver<Connection>>;

  em?: EntityManager;

  constructor(opts: StoreType) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );

    // We'll use the `storageFolderName` property to set the file name and
    // path.join to bring it all together as a string
    this.path = path.join(userDataPath, `${opts.storageFolderName}`);
    // Start database
    (async () => {
      this.db = await MikroORM.init();
      this.em = this.db.em;
      this.getAllTasks();
    })();
  }

  get Tasks() {
    return this.em?.find(Task, {});
  }

  /**
   * Get all the tasks in the database
   * TODO: We will want to make this more specific otherwise it can get phat
   */
  getAllTasks() {
    return this.em?.find(Task, {});
  }

  /**
   * Adds a single task or an array of tasks to the database;
   * TODO: Add the subtask parsing.
   * @param data the task(s) to be added to the database. Already formatted.
   */
  addTasks(data: Task | Task[]) {
    return this.em?.persistAndFlush(data);
  }

  async updateTask(data: TaskType) {
    const task = await this.em?.findOne(Task, { id: data.id });
    if (task == null)
      console.error(
        `Could not find task "${data.taskName}" with id: ${data.id}`
      );
    await wrap(task).assign(data);
    this.em?.flush();
  }
}

// expose the class
export default Database;
