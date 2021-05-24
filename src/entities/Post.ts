// https://mikro-orm.io/docs/defining-entities/

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// Author.ts
// Entity = Database Table
@Entity()
export class Post {

  @PrimaryKey()
  id!: number;
  
  @Property({type: 'date'})
  createdAt: Date = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
  
  @Property({type: 'text'})
  title!: string;
}