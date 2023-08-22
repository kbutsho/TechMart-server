import { Schema, Types, model } from "mongoose";
import { IToken, TokenModel } from "./token.interface";

const tokenSchema = new Schema<IToken>({
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

export const Token = model<IToken, TokenModel>('Token', tokenSchema);
