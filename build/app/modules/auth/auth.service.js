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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const seller_model_1 = require("../seller/seller.model");
const customer_model_1 = require("../customer/customer.model");
const enums_1 = require("../../../helpers/enums");
const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: data.email });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "email already exist!");
    }
    if (data.role === enums_1.USER_ROLE.SELLER || data.role === enums_1.USER_ROLE.CUSTOMER) {
        let userId = null;
        if (data.role === enums_1.USER_ROLE.SELLER) {
            const seller = yield seller_model_1.Seller.create({
                firstName: data.firstName,
                lastName: data.lastName,
                image: null,
                phone: null
            });
            userId = seller._id;
        }
        else {
            const customer = yield customer_model_1.Customer.create({
                firstName: data.firstName,
                lastName: data.lastName,
                image: null,
                phone: null
            });
            userId = customer._id;
        }
        const { firstName, lastName } = data, userData = __rest(data, ["firstName", "lastName"]);
        const newData = Object.assign(Object.assign({}, userData), { userId: userId, status: data.role === enums_1.USER_ROLE.SELLER ? enums_1.USER_STATUS.PENDING : enums_1.USER_STATUS.ACTIVE });
        const user = yield user_model_1.User.create(newData);
        const result = yield user_model_1.User.findById(user._id);
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "role not exist!");
    }
});
exports.AuthService = {
    signup
};
