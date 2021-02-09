/* eslint-disable no-underscore-dangle */
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

@Entity()
export default class Tag {
  @PrimaryKey()
  id = uuidv4();

  @Property()
  name: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks = new Collection<Task>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(args: TagType) {
    this.name = args.name;
  }
}

type TagType = {
  name: string;
};
