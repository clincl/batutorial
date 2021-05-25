import { Post } from "../entities/Post";
// Note that VSCode auto-complete uses "src/..."
// use relative addressing from current directory (../...)
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Int, Mutation} from "type-graphql";

@Resolver()
export class PostResolver{
    // Multiple Posts
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
    // Lookup by ID
    // GraphQL type
    // Setting nullable:true removes extra error information returned from a null response GraphQL query.
    @Query(()=>Post,{nullable:true})
    post(
        // Can change 'id' and the changed value will be used in the GraphQL query.
        @Arg("id",()=>Int) id: number,
        @Ctx() {em}: MyContext
        // Typescript type
        ): Promise<Post | null> {
        return em.findOne(Post, {id})
    }
    // Create Post
    // type GraphQL may be infer types
    // ( Arg("title",()=>String) => Arg("title"))
    @Mutation(()=>Post)
    async createPost(
        @Arg("title",()=>String) title: string,
        @Ctx() {em}: MyContext
        // Typescript type
        ): Promise<Post> {
            const post = em.create(Post,{title})
            await em.persistAndFlush(post)
            return post;
    }

    // Update Post
    @Mutation(()=>Post, {nullable:true})
    async updatePost(
        @Arg("id",() => String) id: number,
        @Arg("title", () => String, {nullable:true}) title:string,
        @Ctx() {em}: MyContext
        ): Promise<Post | null> {
            const post = await em.findOne(Post,{id});
            if (!post){
                return null
            }if (typeof title !== 'undefined') {
                post.title = title
                await em.persistAndFlush(post)
            }
            await em.persistAndFlush(post)
            return post;
    }
    // Delete Post
    @Mutation(()=>Boolean)
    async deletePost(
        @Arg("id",() => String) id: number,
        @Ctx() {em}: MyContext
        ): Promise<boolean> {
            em.nativeDelete(Post,{id})
            return true;
    }    
}

