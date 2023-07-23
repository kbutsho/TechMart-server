import { Model, Types } from 'mongoose';

export type IAdmin = {
  _id: Types.ObjectId;
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

export type AdminModel = Model<IAdmin, Record<string, unknown>>;