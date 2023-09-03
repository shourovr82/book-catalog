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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const createNewBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const conditions = [];
    if (search) {
        conditions.push({
            OR: book_constants_1.booksFilterableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (minPrice) {
        const minPriceFloat = parseFloat(minPrice);
        if (!isNaN(minPriceFloat)) {
            conditions.push({
                OR: [{ price: { gte: minPriceFloat } }],
            });
        }
    }
    if (maxPrice) {
        const maxPriceFloat = parseFloat(maxPrice);
        if (!isNaN(maxPriceFloat)) {
            conditions.push({
                OR: [{ price: { lte: maxPriceFloat } }],
            });
        }
    }
    if (Object.keys(filterData).length > 0) {
        conditions.push({
            AND: Object.keys(filterData).map(key => ({
                categoryId: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = conditions.length > 1 ? { AND: conditions } : conditions[0] || {};
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
            reviewAndRatings: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: 'desc',
            },
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found !!');
    }
    return result;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found !!');
    }
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found !!');
    }
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
const getBookByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const isExistCategory = yield prisma_1.default.category.findMany({});
    if (!isExistCategory) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category Not Exist');
    }
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip,
        take: size,
        include: {
            category: true,
            reviewAndRatings: true,
        },
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
        skip,
        take: size,
    });
    const totalPage = Math.ceil(total / size);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not Found on this category !!');
    }
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
exports.BooksService = {
    createNewBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    getBookByCategory,
};
