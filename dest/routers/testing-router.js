"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const blogger_repository_1 = require("../repository/blogger-repository");
const http_statuses_1 = require("../core/http-statuses");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => {
    blogger_repository_1.dataRepository.deleteAllBloggers();
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
