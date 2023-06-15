import mongoose from "mongoose";
import { User } from "../../types";
const User = mongoose.model('User');


export default () => {
    return new User({}).save() as Promise<User>;
}