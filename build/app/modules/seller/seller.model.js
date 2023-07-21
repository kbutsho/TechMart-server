"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const mongoose_1 = require("mongoose");
const sellerSchema = new mongoose_1.Schema({
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
exports.Seller = (0, mongoose_1.model)('Seller', sellerSchema);
