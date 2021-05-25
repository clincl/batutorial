import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    // Connect to the database
    const orm = await MikroORM.init(microConfig)
    // run in the CLI: npx mikro-orm migration:create
    // Run the migrations
    await orm.getMigrator().up();
    const app = express();
    app.get('/',(_,res)=>{
        res.send("hello")
    })
    const apolloServer = new ApolloServer ({
        // buildSchema() -> Promise (so await it)
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            // uses class validation by default
            validate: false
        }),
        // Context is an object accessible by all resolvers
        // No need for orm, just em object
        // Function that returns an object for the context
        // Can also get req, res from express
        context: () => ({em: orm.em})
    });
    // Creates a GraphQL endpoint on express
    apolloServer.applyMiddleware({app})
    app.listen(4000, () => {
        console.log('servr has started on localhost:4000');
    })
    // // Creates an instance of post./Run SQL
    // const post = orm.em.create(Post, {title:'my first post'})
    // // const post = new Post({'my first post'})
    // // Pushes post to the database
    // await orm.em.persistAndFlush(post)
    // // console.log('-------------------sql2-------------------')
    // // await orm.em.nativeInsert(Post, {title: 'my first post 2'})
    // const posts = await orm.em.find(Post, {})
    // console.log(posts)

}

main().catch((err)=>{
    console.error(err)
});