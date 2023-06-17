import { createClient } from 'redis';
const redisUrl = 'redis://127.0.0.1:6379';
const client = createClient({url: redisUrl});
(async () => await client.connect())();
import { Query } from 'mongoose';


const exec = Query.prototype.exec;
Query.prototype.cache = function(options: {key?: string} = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');
	return this;
};


Query.prototype.exec = async function (...args) {

	if(!this.useCache){
		return exec.apply(this, ...args);
	}
	const key = JSON.stringify({ 
		collection: this.mongooseCollection.name,
		...this.getQuery()
	});
  
	// check if we have a value for 'key' in redis
	const cacheValue = await client.hGet(this.hashKey, key);
	// check if the value is null
	if (cacheValue) {
		// if so, return that


		const doc = JSON.parse(cacheValue);

		return Array.isArray(doc) 
			? doc.map(d => new this.model(d)) 
			: new this.model(doc);

	}
	// otherwise, issue the query and store the result in redis
	const result = await exec.apply(this, ...args);
	await client.hSet(this.hashKey, key, JSON.stringify(result));
	await client.expire(this.hashKey, 10);
	return result;
};


export const clearHash = (hashKey: string) => {
	client.del(JSON.stringify(hashKey));
};
