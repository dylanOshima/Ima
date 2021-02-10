/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import Database from './util/Database';
import {
  ADD_TASK_REQUEST,
  UPDATE_TASK_REPLY,
  UPDATE_TASK_REQUEST,
  GET_TAGS_REQUEST,
  GET_TAGS_REPLY,
} from './util/constants';
import Task, { TaskType } from './entities/Task';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const db = new Database({
  storageFolderName: 'test-config',
});

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions: string[] = []; // ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    height: 1024,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      // TODO: https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// Database Events
ipcMain.on('fetch-storage', async (event) => {
  console.log('IPC: "fetching-storage" event');
  const tasks = await db.getAllTasks();
  if (tasks == null) throw new Error('Failed to get all tasks.');
  const tasksConv = await Promise.all(tasks.map((task) => Task.convert(task)));
  event.reply('fetch-storage-reply', tasksConv);
});

ipcMain.on(ADD_TASK_REQUEST, async (event, args) => {
  console.log(`IPC: "${ADD_TASK_REQUEST}" event`);
  const { id: key, tags, ...t } = args;
  const task = new Task(t);
  await db.em?.persistAndFlush(task);
  event.reply(UPDATE_TASK_REPLY, {
    updatedTask: await Task.convert(task),
    key,
  });
});

ipcMain.on(UPDATE_TASK_REQUEST, async (_, task: TaskType) => {
  console.log(`IPC: "${UPDATE_TASK_REQUEST}" event`);
  db.updateTask(task);
});

ipcMain.on(GET_TAGS_REQUEST, async (event) => {
  console.log(`IPC: "${GET_TAGS_REQUEST}" event`);
  const tags = await db.getAllTags();
  event.reply(
    GET_TAGS_REPLY,
    tags?.map((tag) => tag.name)
  );
});
