declare module 'mongoose' {
    interface Query {
      cache: (options: {key?: string}) => Query;
    }
  }
  
import { Types } from 'mongoose';

export interface User {
    googleId: string;
    displayName: string;
    _id: Types.ObjectId;
}

