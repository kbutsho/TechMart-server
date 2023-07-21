import { Schema, model, } from 'mongoose';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { userRole, userStatus } from './user.constant';
import config from '../../../config';


const userSchema = new Schema<IUser>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    status: {
      type: String,
      required: true,
      enum: userStatus
    },
    isFirebase: {
      type: Boolean,
      enum: [0, 1],
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

// check user exist or not
userSchema.statics.isUserExist = async function (email: string): Promise<Pick<IUser, 'userId' | 'email' | 'role'> | null> {
  return await User.findOne({ email }, { userId: 1, phoneNumber: 1, role: 1, password: 1 }
  );
};

// check password
userSchema.statics.isPasswordMatched = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
