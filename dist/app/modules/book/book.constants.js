"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRelationalFieldsMapper = exports.booksRelationalFields = exports.booksSearchableFields = exports.booksFilterableFields = void 0;
exports.booksFilterableFields = ['title', 'author', 'genre'];
exports.booksSearchableFields = ['title', 'author', 'genre'];
exports.booksRelationalFields = ['categoryId'];
exports.booksRelationalFieldsMapper = {
    category: 'category',
};
