"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userAuth_controller_1 = require("./userAuth.controller");
const router = express_1.default.Router();
router.post('/signup', userAuth_controller_1.UserAuthController.createNewUser);
router.post('/login', userAuth_controller_1.UserAuthController.userLogin);
exports.UserAuthRoutes = router;
