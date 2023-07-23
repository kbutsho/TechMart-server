import { Model, Types } from 'mongoose';

export type ISuperAdmin = {
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

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;