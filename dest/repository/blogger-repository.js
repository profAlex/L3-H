"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRepository = void 0;
const nonDisclosableDatabase = {
    bloggerRepository: [{
            bloggerInfo: {
                id: "001",
                name: "blogger_001",
                description: "takoy sebe blogger...",
                websiteUrl: "https://takoy.blogger.com",
            },
            bloggerPosts: [{
                    id: "001_001",
                    title: "post blog 001",
                    shortDescription: "post ni o 4em",
                    content: "Eto testovoe napolnenie posta 001_001",
                    blogId: "001",
                    blogName: "blogger_001"
                },
                {
                    id: "001_002",
                    title: "post blog 002",
                    shortDescription: "post ni o 4em",
                    content: "Eto testovoe napolnenie posta 001_002",
                    blogId: "001",
                    blogName: "blogger_001"
                }
            ]
        },
        {
            bloggerInfo: {
                id: "002",
                name: "blogger_002",
                description: "a eto klassnii blogger!",
                wbesiteUrl: "https://klassnii.blogger.com"
            },
            bloggerPosts: [{
                    id: "002_001",
                    title: "post blog 001",
                    shortDescription: "horowii post",
                    content: "Eto testovoe napolnenie posta 002_001",
                    blogId: "002",
                    blogName: "blogger_002"
                },
                {
                    postId: "002_002",
                    postTitle: "post blog 002",
                    postShortDescription: "horowii post",
                    postContent: "Eto testovoe napolnenie posta 002_002",
                    blogId: "002",
                    blogName: "blogger_002"
                }]
        }
    ]
};
const generateCombinedId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString().substring(2, 5);
    return `${timestamp}-${random}`;
};
exports.dataRepository = {
    // *****************************
    // методы для управления блогами
    // *****************************
    getAllBlogs() {
        return nonDisclosableDatabase.bloggerRepository.map(({ bloggerInfo }) => ({
            id: bloggerInfo.id,
            name: bloggerInfo.name,
            description: bloggerInfo.description,
            websiteUrl: bloggerInfo.websiteUrl
        }));
    },
    createNewBlog(newBlog) {
        const newBlogEntry = Object.assign({ id: generateCombinedId() }, newBlog);
        const newDatabaseEntry = {
            bloggerInfo: newBlogEntry,
            bloggerPosts: []
        };
        nonDisclosableDatabase.bloggerRepository.push(newDatabaseEntry);
        // console.log("ID Inside repository: ",newBlogEntry.id);
        return newBlogEntry;
    },
    findSingleBlog(blogId) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
        if (blogger) {
            const foundBlogger = {
                id: blogger.bloggerInfo.id,
                name: blogger.bloggerInfo.name,
                description: blogger.bloggerInfo.description,
                websiteUrl: blogger.bloggerInfo.websiteUrl
            };
            // console.log("ID inside finding function:", foundBlogger.id);
            return foundBlogger;
        }
        return undefined;
    },
    updateBlog(blogId, newData) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
        if (blogger) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            const updatedBlogger = Object.assign(Object.assign({}, blogger), { bloggerInfo: {
                    id: blogger.bloggerInfo.id,
                    name: newData.name,
                    description: newData.description,
                    websiteUrl: newData.websiteUrl
                } });
            nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogger;
            return null;
        }
        return undefined;
    },
    deleteBlog(blogId) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogId);
        if (blogger) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            nonDisclosableDatabase.bloggerRepository.splice(blogIndex, 1);
            return null;
        }
        return undefined;
    },
    // *****************************
    // методы для управления постами
    // *****************************
    getAllPosts() {
        return nonDisclosableDatabase.bloggerRepository.flatMap((element) => { var _a; return ((_a = element.bloggerPosts) !== null && _a !== void 0 ? _a : []); });
    },
    createNewPost(newPost) {
        var _a, _b;
        let blogName = (_a = this.findSingleBlog(newPost.blogId)) === null || _a === void 0 ? void 0 : _a.name;
        if (!blogName) {
            return undefined;
        }
        const blogIndex = nonDisclosableDatabase.bloggerRepository.findIndex((blogger) => blogger.bloggerInfo.id === newPost.blogId);
        const newPostEntry = Object.assign(Object.assign({}, newPost), { id: generateCombinedId(), blogName: blogName });
        (_b = nonDisclosableDatabase.bloggerRepository[blogIndex].bloggerPosts) === null || _b === void 0 ? void 0 : _b.push(newPostEntry);
        return newPostEntry;
    },
    findSinglePost(postId) {
        for (const blogger of nonDisclosableDatabase.bloggerRepository) {
            if (!blogger.bloggerPosts)
                continue;
            for (const post of blogger.bloggerPosts) {
                if (post.id === postId)
                    return post;
            }
        }
        return undefined;
    },
    updatePost(postId, newData) {
        //const post = this.findSinglePost(id);
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === newData.blogId);
        if (blogger && blogger.bloggerPosts) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            let post = this.findSinglePost(postId);
            if (blogIndex !== -1 && post) {
                let postIndex = blogger.bloggerPosts.indexOf(post);
                if (postIndex !== -1) {
                    const updatedPost = Object.assign({ id: post.id, blogName: post.blogName }, newData);
                    // Создаем новый массив постов с обновленным постом
                    const updatedPosts = [
                        ...blogger.bloggerPosts.slice(0, postIndex),
                        updatedPost,
                        ...blogger.bloggerPosts.slice(postIndex + 1)
                    ];
                    // Создаем обновленную запись блоггера
                    const updatedBlogEntry = Object.assign(Object.assign({}, blogger), { bloggerPosts: updatedPosts });
                    nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogEntry;
                    return null;
                }
            }
        }
        return undefined;
    },
    deletePost(postId) {
        var _a;
        const post = this.findSinglePost(postId);
        if (!post) {
            return undefined;
        }
        const blogIdFromPost = post.blogId;
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === blogIdFromPost);
        if (blogger && blogger.bloggerPosts) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            if (blogIndex !== -1 && post) {
                let postIndex = blogger.bloggerPosts.indexOf(post);
                (_a = nonDisclosableDatabase.bloggerRepository[blogIndex].bloggerPosts) === null || _a === void 0 ? void 0 : _a.splice(postIndex, 1);
                return null;
            }
        }
        return undefined;
    },
    // *****************************
    // методы для тестов
    // *****************************
    deleteAllBloggers() {
        nonDisclosableDatabase.bloggerRepository = [];
    },
    returnLength() {
        return nonDisclosableDatabase.bloggerRepository.length;
    }
};
