/* eslint-disable no-underscore-dangle */
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ abstract: true })
export default abstract class BaseEntity {
  @PrimaryKey()
  id = uuidv4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
