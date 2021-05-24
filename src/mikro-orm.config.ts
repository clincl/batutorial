import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
    entities: [Post],
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