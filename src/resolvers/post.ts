import { Post } from "../entities/Post";
// Note that VSCode auto-complete uses "src/..."
// use relative addressing from current directory (../...)
import { MyContext } from "../types";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(()=>[Post])
    posts(
    //     @Ctx() ctx: MyContext
    // ) {
    //     return ctx.em.
    // Below uses destructuring for cleaner syntax
        @Ctx() {em}: MyContext
    ): Promise<Post[]> {
        return em.find(Post, {})
    }
}