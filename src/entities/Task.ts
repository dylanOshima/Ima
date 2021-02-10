import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';

import BaseEntity from './BaseEntity';
// eslint-disable-next-line import/no-cycle
import Tag from './Tag';

type TaskConstructorArgType = Omit<TaskType, 'subtasks' | 'tags' | 'id'> & {
  subtasks?: Collection<Task>;
  tags?: Collection<Tag>;
};

@Entity()
export default class Task extends BaseEntity {
  @Property()
  taskName: string;

  @Property()
  taskDescription: string;

  @Property()
  taskLinks: string[];

  @Property()
  value: number;

  @Property()
  finished: boolean;

  @ManyToMany(() => Task)
  subtasks = new Collection<Task>(this);

  @ManyToMany(() => Tag, 'tasks', { owner: true })
  tags = new Collection<Tag>(this);

  @Property()
  dueDate: Date | null;

  @Property()
  expectedTime: number | null;

  constructor(args: TaskConstructorArgType) {
    super();
    const {
      taskName,
      taskDescription,
      value = 0,
      finished = false,
      taskLinks = [],
      tags,
      subtasks,
      dueDate,
      expectedTime,
    } = args;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskLinks = taskLinks;
    this.value = value;
    this.finished = finished;
    this.dueDate = dueDate ?? null;
    this.expectedTime = expectedTime ?? null;
    if (tags != null) this.tags = tags;
    if (subtasks != null) this.subtasks = subtasks;
  }

  static async convert(t: Task): Promise<TaskType> {
    // TODO: Initialize this with the appropriate values
    const subtasks: string[] = [];
    const tags: string[] = [];
    if (!t.tags.isInitialized()) await t.tags.init();
    t.tags.getItems().forEach((tag) => {
      tags.push(tag.name);
    });
    // TODO: We need to serialize these so that they can be used in redux
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { updatedAt, createdAt, ...task } = t;
    return {
      ...task,
      subtasks,
      tags,
    } as TaskType;
  }
}

export type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskLinks: string[];
  subtasks: string[];
  tags: string[];
  value: number;
  finished: boolean;
  dueDate: Date | null;
  expectedTime: number | null;
  // Auto generated
  // createdAt?: Date | null;
  // updatedAt?: Date | null;
  // _id?: string | null;
};
