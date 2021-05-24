import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
const main = async () => {
    // Connect to the database
    const orm = await MikroORM.init(microConfig)
    // Run the migrations
    await orm.getMigrator().up();
    // Creates an instance of post./Run SQL
    const post = orm.em.create(Post, {title:'my first post'})
    // const post = new Post({'my first post'})
    // Pushes post to the database
    await orm.em.persistAndFlush(post)
    // console.log('-------------------sql2-------------------')
    // await orm.em.nativeInsert(Post, {title: 'my first post 2'})
    const posts = await orm.em.find(Post, {})
    console.log(posts)
    
}

main().catch((err)=>{
    console.error(err)
});