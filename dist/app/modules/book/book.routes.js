"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/', book_controller_1.BooksController.getAllBooks);
router.get('/:id', book_controller_1.BooksController.getSingleBook);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.updateBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.deleteBook);
router.get('/:categoryId/category', book_controller_1.BooksController.getBookByCategory);
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.createNewBook);
exports.BooksRoutes = router;
