import { Model } from 'mongoose';

export type ICustomer = {
  firstName: string;
  lastName: string;
  address?: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
  };
  phone?: string,
  image?: string;
}

export type CustomerModel = Model<ICustomer, Record<string, unknown>>;