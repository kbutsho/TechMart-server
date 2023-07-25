import { Schema, model } from "mongoose";
import { ISuperAdmin, SuperAdminModel } from "./super.admin.interface";

const superAdminSchema = new Schema<ISuperAdmin>({
  firstName: {
    type: String,
    required: true
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
    toJSON: { virtuals: true }
  }
);

export const SuperAdmin = model<ISuperAdmin, SuperAdminModel>('SuperAdmin', superAdminSchema);
