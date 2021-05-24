"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    entities: [Post_1.Post],
    dbName: 'lireddit',
    user: 'postgres',
    password: 'postgres',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    discovery: { warnWhenNoEntities: false },
};
//# sourceMappingURL=mikro-orm.config.js.map