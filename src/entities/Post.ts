// https://mikro-orm.io/docs/defining-entities/

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// Author.ts
// Entity = Database Table
@ObjectType()
@Entity()
export class Post {
  @Field(()=>Int)
  @PrimaryKey()
  id!: number;

  @Field(()=>String)
  @Property({type: 'date'})
  createdAt: Date = new Date();
  
  @Field(()=>String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(()=>String)
  @Property({type: 'text'})
  title!: string;
}