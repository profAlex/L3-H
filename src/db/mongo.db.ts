import {Collection, Db, MongoClient} from "mongodb";
import { BlogViewModel } from "../types/blog-view-model";
import {PostViewModel} from "../types/post-view-model";

const DB_NAME = 'bloggers_db';
const BLOGGERS_COLLECTION_NAME = 'bloggers_collection';
const POSTS_COLLECTION_NAME = 'posts_collection';

const URI = "mongodb+srv://admin:admin@learningcluster.f1zm90x.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";

export let client: MongoClient;
export let bloggersCollection: Collection<BlogViewModel>;
export let postsCollection: Collection<PostViewModel>;


export async function runDB() {
    client = new MongoClient(URI);
    const db: Db = client.db(DB_NAME);
    bloggersCollection = db.collection<BlogViewModel>(BLOGGERS_COLLECTION_NAME);
    postsCollection = db.collection<PostViewModel>(POSTS_COLLECTION_NAME);


    try {
        await client.connect();
        await db.command({ping: 1});
        console.log(`Connected to DB ${DB_NAME}`);
    }
    catch (error) {
        await client.close();
        throw new Error(`Database not connected: ${error}`);
    }
}