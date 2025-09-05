"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => { });
exports.postsRouter.post('/', (req, res) => { }); //auth guarded
exports.postsRouter.get('/:id', (req, res) => { });
exports.postsRouter.put('/:id', (req, res) => { }); //auth guarded
exports.postsRouter.delete('/:id', (req, res) => { }); //auth guarded
