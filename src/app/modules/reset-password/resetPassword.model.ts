import { Schema, model } from "mongoose";
import { IResetPassword, ResetPasswordModel } from "./resetPassword.interface";

const resetPasswordSchema = new Schema<IResetPassword>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true
  },
  verification_token: {
    type: String,
    required: true
  }
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const ResetPassword = model<IResetPassword, ResetPasswordModel>('ResetPassword', resetPasswordSchema);
