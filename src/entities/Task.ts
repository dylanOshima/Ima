import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';

import BaseEntity from './BaseEntity';

type TaskConstructorArgType = Omit<TaskType, 'subtasks' | 'id'> & {
  subtasks?: Collection<Task>;
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
    if (subtasks != null) this.subtasks = subtasks;
  }

  static convert(t: Task): TaskType {
    // TODO: Initialize this with the appropriate values
    const subtasks: string[] = [];
    // TODO: We need to serialize these so that they can be used in redux
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { updatedAt, createdAt, ...task } = t;
    return {
      ...task,
      subtasks,
    } as TaskType;
  }
}

export type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskLinks: string[];
  subtasks: string[];
  value: number;
  finished: boolean;
  dueDate: Date | null;
  expectedTime: number | null;
  // Auto generated
  // createdAt?: Date | null;
  // updatedAt?: Date | null;
  // _id?: string | null;
};
