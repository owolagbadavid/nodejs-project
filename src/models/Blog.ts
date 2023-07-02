import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

interface IBlog {
  title: string;
  content: string;
	imageUrl: string,
  createdAt: Date;
  _user: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
	title: String,
	content: String,
	imageUrl: String,
	createdAt: { type: Date, default: Date.now },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model<IBlog>('Blog', blogSchema);
