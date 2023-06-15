require('../models/User')

import mongoose from 'mongoose'
import keys from '../config/keys'

console.log('worded')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)
.then(() => console.log('connected to mongoDB'))
.catch((err) => console.log(err))