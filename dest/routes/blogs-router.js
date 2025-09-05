"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => { });
exports.blogsRouter.post('/', (req, res) => { }); //auth guarded
exports.blogsRouter.get('/:id', (req, res) => { });
exports.blogsRouter.put('/:id', (req, res) => { }); //auth guarded
exports.blogsRouter.delete('/:id', (req, res) => { }); //auth guarded
