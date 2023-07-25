import { Schema, model } from "mongoose";
import { CustomerModel, ICustomer } from "./customer.interface";

const customerSchema = new Schema<ICustomer>({
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

export const Customer = model<ICustomer, CustomerModel>('Customer', customerSchema);
