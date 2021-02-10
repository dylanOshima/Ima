import { MikroORM } from '../src/node_modules/@mikro-orm/core';
import Task from '../src/entities/Task';
import Tag from '../src/entities/Tag';

(async () => {
  try {
    const orm = await MikroORM.init();

    // Initialize schema
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();

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
    // Initialize tags
    const t1 = new Tag({ name: 'ima-dev' });
    const t2 = new Tag({ name: 'tutorial' });
    tutorialTask.tags.add(t1, t2);

    // Commit
    await orm.em.persistAndFlush(tutorialTask);
    await orm.close(true);
  } catch (err) {
    throw new Error(`Error populating database. ${err}`);
  }
})();
