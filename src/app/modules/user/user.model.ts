import { Schema, model, } from 'mongoose';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { userRole, userStatus } from './user.constant';
import config from '../../../config';

const userSchema = new Schema<IUser>({
  userId: {
    type: Types.ObjectId,
    required: true
  },
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
  password: {
    type: String,
    select: 0
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
  // isVerified: {
  //   type: Boolean,
  //   required: true
  // },
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
