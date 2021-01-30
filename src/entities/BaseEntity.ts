import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ abstract: true })
export default abstract class BaseEntity {
  @PrimaryKey()
  _id!: string;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor() {
    const instanceId = uuidv4();
    // eslint-disable-next-line no-underscore-dangle
    this._id = instanceId;
    this.id = instanceId;
  }
}
