"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/book/book.routes");
const category_routes_1 = require("../modules/category/category.routes");
const orders_routes_1 = require("../modules/orders/orders.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const userAuth_routes_1 = require("../modules/userAuth/userAuth.routes");
const users_routes_1 = require("../modules/users/users.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: userAuth_routes_1.UserAuthRoutes,
    },
    {
        path: '/users',
        route: users_routes_1.UsersRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.CategoriesRoutes,
    },
    {
        path: '/books',
        route: book_routes_1.BooksRoutes,
    },
    {
        path: '/orders',
        route: orders_routes_1.OrderRoutes,
    },
    {
        path: '/profile',
        route: profile_routes_1.ProfileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
