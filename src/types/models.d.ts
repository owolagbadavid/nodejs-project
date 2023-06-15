import { Types } from 'mongoose';

export interface User {
    googleId: string;
    displayName: string;
    _id: Types.ObjectId;
}