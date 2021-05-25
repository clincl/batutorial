import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { User } from "./entities/User";

export default {
    // run npx mikro-orm migration:create after adding migrations
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    // Update this whenever you create a new entity.
    entities: [Post, User],
    dbName: 'lireddit',
    user: 'postgres',
    password: 'postgres',
    type: 'postgresql',
    // Set debugging to true when we are not in production/we are in deveopment
    debug: !__prod__,
    // Use standard errors instead of MikroORM throwing theeZZ
    discovery: { warnWhenNoEntities: false },
} as Parameters<typeof MikroORM.init>[0];

// as const; (gets type; results in an error in index.ts since export would be immutable)

// bob.type
// type = stirng
// bob.dbName
// type = string
// use as const