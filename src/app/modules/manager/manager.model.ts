import { Schema, model } from "mongoose";
import { IManager, ManagerModel } from "./manager.interface";

const managerSchema = new Schema<IManager>({
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

export const Manager = model<IManager, ManagerModel>('Manager', managerSchema);
