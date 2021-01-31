import { MikroORM } from '../src/node_modules/@mikro-orm/core';
import Task from '../src/entities/Task';

(async () => {
  try {
    const orm = await MikroORM.init();

    // Initialize schema
    const generator = orm.getSchemaGenerator();

    // Initialize a test task
    const tutorialTask = new Task({
      taskName: 'Familiarize yourself with Ima!',
      taskDescription: 'Get to know how to use the Ima todo app.',
      taskLinks: [],
      value: 100,
      finished: false,
      dueDate: null,
      expectedTime: null,
    });
    // console.log(tutorialTask);

    // Commit
    await generator.dropSchema();
    await generator.createSchema();
    await orm.em.nativeInsert(tutorialTask);
    await orm.close(true);
  } catch (err) {
    throw new Error(`Error populating database. ${err}`);
  }
})();
