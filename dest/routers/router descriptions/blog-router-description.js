"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.findSingleBlog = exports.createNewBlog = exports.getAllBlogs = void 0;
const http_statuses_1 = require("../../core/http-statuses");
const blogger_repository_1 = require("../../repository/blogger-repository");
const getAllBlogs = (req, res) => {
    res.status(http_statuses_1.HttpStatus.Ok).json(blogger_repository_1.dataRepository.getAllBlogs());
};
exports.getAllBlogs = getAllBlogs;
const createNewBlog = (req, res) => {
    res.status(http_statuses_1.HttpStatus.Created).json(blogger_repository_1.dataRepository.createNewBlog(req.body));
};
exports.createNewBlog = createNewBlog;
const findSingleBlog = (req, res) => {
    const result = blogger_repository_1.dataRepository.findSingleBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.status(http_statuses_1.HttpStatus.Ok).json(result);
};
exports.findSingleBlog = findSingleBlog;
const updateBlog = (req, res) => {
    const result = blogger_repository_1.dataRepository.updateBlog(req.params.id, req.body);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
};
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => {
    const result = blogger_repository_1.dataRepository.deleteBlog(req.params.id);
    if (result === undefined) {
        res.sendStatus(http_statuses_1.HttpStatus.NotFound);
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
};
exports.deleteBlog = deleteBlog;
