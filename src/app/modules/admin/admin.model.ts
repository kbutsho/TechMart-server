import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    firstName: {
      type: String, required: true
    },
    lastName: {
      type: String
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
