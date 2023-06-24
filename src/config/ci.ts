import dotenv from 'dotenv';
dotenv.config();

export const googleClientID = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const mongoURI = 'mongodb://localhost:27017/blog_dev';
export const cookieKey = '123123123';
export const redisUrl = 'redis://127.0.0.1:6379';

const keys = { 
	googleClientID,
	googleClientSecret,
	mongoURI,
	cookieKey,
	redisUrl,
};

export default keys;