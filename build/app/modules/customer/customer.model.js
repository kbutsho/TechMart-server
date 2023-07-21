"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        street: {
            type: String
        },
        zipCode: {
            type: String
        }
    },
    image: {
        type: String
    },
    phone: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Customer = (0, mongoose_1.model)('Customer', customerSchema);
