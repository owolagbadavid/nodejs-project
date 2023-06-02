import { createClient } from 'redis';
const redisUrl = 'redis://127.0.0.1:6379';
const client = createClient({url: redisUrl});
import { promisify } from 'util';
client.get = promisify(client.get).bind(client);

import { Query } from "mongoose";

const exec = Query.prototype.exec;

Query.prototype.exec = function () {

  const key = { 
    collection: this.mongooseCollection.name,
    ...this.getQuery()
  }

  console.log(key);

  return exec.apply(this, arguments);
};
