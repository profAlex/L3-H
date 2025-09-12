"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsCollection = exports.bloggersCollection = exports.client = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
const DB_NAME = 'bloggers_db';
const BLOGGERS_COLLECTION_NAME = 'bloggers_collection';
const POSTS_COLLECTION_NAME = 'posts_collection';
const URI = "mongodb+srv://admin:admin@learningcluster.f1zm90x.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.client = new mongodb_1.MongoClient(URI);
        const db = exports.client.db(DB_NAME);
        exports.bloggersCollection = db.collection(BLOGGERS_COLLECTION_NAME);
        exports.postsCollection = db.collection(POSTS_COLLECTION_NAME);
        try {
            yield exports.client.connect();
            yield db.command({ ping: 1 });
            console.log(`Connected to DB ${DB_NAME}`);
        }
        catch (error) {
            yield exports.client.close();
            throw new Error(`Database not connected: ${error}`);
        }
    });
}
