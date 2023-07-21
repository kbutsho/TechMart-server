"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_STATUS = exports.USER_ROLE = void 0;
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["ADMIN"] = "admin";
    USER_ROLE["SUPER_ADMIN"] = "super-admin";
    USER_ROLE["SELLER"] = "seller";
    USER_ROLE["CUSTOMER"] = "customer";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "active";
    USER_STATUS["INACTIVE"] = "inactive";
    USER_STATUS["PENDING"] = "pending";
    USER_STATUS["BLOCK"] = "block";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
