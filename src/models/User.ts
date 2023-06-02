import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String
});

mongoose.model('User', userSchema);
