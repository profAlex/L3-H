"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.findSinglePost = exports.createNewPost = exports.getAllPosts = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const blogger_repository_1 = require("../../repository/blogger-repository");
const getAllPosts = (req, res) => {
    res.status(http_statuses_1.HttpStatus.Ok).json(blogger_repository_1.dataRepository.getAllPosts());
};
exports.getAllPosts = getAllPosts;
const createNewPost = (req, res) => {
    res.status(http_statuses_1.HttpStatus.Created).json(blogger_repository_1.dataRepository.createNewPost(req.body));
};
exports.createNewPost = createNewPost;
const findSinglePost = (req, res) => {
    const result = blogger_repository_1.dataRepository.findSinglePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
};
exports.findSinglePost = findSinglePost;
const updatePost = (req, res) => {
    const result = blogger_repository_1.dataRepository.updatePost(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
};
exports.updatePost = updatePost;
const deletePost = (req, res) => {
    const result = blogger_repository_1.dataRepository.deletePost(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
};
exports.deletePost = deletePost;
