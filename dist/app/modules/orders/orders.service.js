"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNewOrder = (data, token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken;
    try {
        decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid access Token');
    }
    const orderData = Object.assign({ userId: decodedToken.userId }, data);
    const result = yield prisma_1.default.order.create({
        data: orderData,
    });
    return result;
});
const getAllOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken;
    try {
        decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid access Token');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: decodedToken.userId,
        },
    });
    //
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not Exist');
    }
    let result = null;
    if (isUserExist && (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: decodedToken.userId,
            },
            select: {
                id: true,
                status: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        email: true,
                        contactNo: true,
                        role: true,
                    },
                },
                orderedBooks: true,
            },
        });
    }
    if (isUserExist && (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findMany({
            select: {
                id: true,
                status: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        email: true,
                        contactNo: true,
                        role: true,
                    },
                },
                orderedBooks: true,
            },
        });
    }
    if (!(result === null || result === void 0 ? void 0 : result.length)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No Orders Found !!');
    }
    return result;
});
const getSingleOrder = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken;
    try {
        decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid access Token');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: decodedToken.userId,
        },
    });
    //
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not Exist');
    }
    let result = null;
    if (isUserExist && isUserExist.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                status: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        email: true,
                        contactNo: true,
                        role: true,
                    },
                },
                orderedBooks: true,
            },
        });
    }
    if (isUserExist && isUserExist.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        console.log(id, decodedToken.userId);
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
                userId: decodedToken.userId,
            },
            select: {
                id: true,
                status: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        email: true,
                        contactNo: true,
                        role: true,
                    },
                },
                orderedBooks: true,
            },
        });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not Authorized User !!');
    }
    return result;
});
exports.OrderService = {
    createNewOrder,
    getAllOrders,
    getSingleOrder,
};
