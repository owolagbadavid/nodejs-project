import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

interface IBlog {
  title: string;
  content: string;
  createdAt: Date;
  _user: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model<IBlog>('Blog', blogSchema);
