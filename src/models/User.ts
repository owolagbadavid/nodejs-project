import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUser {
  googleId: string;
  displayName: string;
}

const userSchema = new Schema<IUser>({
  googleId: String,
  displayName: String
});

mongoose.model<IUser>('User', userSchema);
