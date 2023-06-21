import dotenv from 'dotenv';
import { Keys } from '../types';
dotenv.config();

let keys: Keys;

if(process.env.NODE_ENV === 'ci'){
	keys = require('./ci');
}
else if(process.env.NODE_ENV === 'production'){
	keys = require('./prod');
}
else{
	keys = require('./dev');
}

export default keys;
export const googleClientID = keys.googleClientID;
export const googleClientSecret = keys.googleClientSecret;
export const mongoURI = keys.mongoURI;
export const cookieKey = keys.cookieKey;