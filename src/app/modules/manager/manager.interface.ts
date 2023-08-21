import { Model, Types } from 'mongoose';

export type IManager = {
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

export type ManagerModel = Model<IManager, Record<string, unknown>>;