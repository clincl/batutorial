import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
    const orm = await MikroORM.init({
        entities: [],
        dbName: 'lireddit',
        user: 'postgres',
        password: 'postgres',
        type: 'postgresql',
        // Set debugging to true when we are not in production/we are in deveopment
        debug: !__prod__,
        // Use standard errors instead of MikroORM throwing theeZZ
        discovery: { warnWhenNoEntities: false },
    })
    // Creates an instance of post.
    const post = orm.em.create(Post, {title:'my first post'})
    // const post = new Post({'my first post'})
    // Pushes post to the database
    await orm.em.persistAndFlush(post)
    console.log('-------------------sql2-------------------')
    await orm.em.nativeInsert(Post, {title: 'my first post 2'})
}

main().catch((err)=>{
    console.error(err)
});