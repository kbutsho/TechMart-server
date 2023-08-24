import { Schema, model, } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { userRole, userStatus } from './user.constant';
import config from '../../../config';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: userRole,
    required: true
  },
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
  },
  password: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: userStatus
  },
  isAuthService: {
    type: Boolean,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true
  },
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

// checking password
userSchema.statics.isPasswordMatched = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
