jest.setTimeout(30000);
require('../models/User');

import mongoose from 'mongoose';
import keys from '../config/keys';

mongoose.Promise = global.Promise;
(async () => await mongoose.connect(keys.mongoURI))();
	
	
export default async function teardown(){
	// Your global teardown logic goes here
	await mongoose.disconnect();
	// For example, you can stop a server, disconnect from a database, etc.
}