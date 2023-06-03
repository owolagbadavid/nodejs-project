import { createClient } from 'redis';
const redisUrl = 'redis://127.0.0.1:6379';
const client = createClient({url: redisUrl});
(async () => await client.connect())();
import { Query, model } from 'mongoose';

const exec = Query.prototype.exec;

Query.prototype.exec = async function () {
  const key = JSON.stringify({ 
    collection: this.mongooseCollection.name,
    ...this.getQuery()
  })
  
  // check if we have a value for 'key' in redis
  const cacheValue = await client.get(key);
// check if the value is null
  if (cacheValue) {
// if so, return that
console.log(this);


const doc = JSON.parse(cacheValue);

return Array.isArray(doc) 
? doc.map(d => new this.model(d)) 
: new this.model(doc);

  }
// otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
client.set(key, JSON.stringify(result));
  return result;
};
