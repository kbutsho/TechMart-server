"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required!'
        }).email({
            message: 'invalid email format!'
        }),
        password: zod_1.z.string({
            required_error: 'password is required!'
        }),
        firstName: zod_1.z.string({
            required_error: 'firstName is required!',
        }),
        lastName: zod_1.z.string({
            required_error: 'lastName is required!',
        }),
        role: zod_1.z.string({
            required_error: 'role is required!'
        }),
        isFirebase: zod_1.z.boolean({
            required_error: 'isFirebase is required!'
        })
    })
});
exports.UserValidation = {
    createUser
};
