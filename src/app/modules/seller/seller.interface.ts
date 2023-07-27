import { Model, Types } from 'mongoose';

export type ISeller = {
  _id?: Types.ObjectId;
  firstName: string;
  lastName?: string;
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

export type SellerModel = Model<ISeller, Record<string, unknown>>;