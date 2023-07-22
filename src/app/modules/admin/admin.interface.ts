import { Model } from 'mongoose';

export type IAdmin = {
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