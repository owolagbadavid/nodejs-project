import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { mongoURI, cookieKey } from './/config/keys';
import * as path from 'path';


mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).
	then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const app = express();

app.use(json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());


import './models/User';
import './models/Blog';
import './services/passport';
import './services/cache';


import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import uploadRoutes from './routes/uploadRoutes';
authRoutes(app);
blogRoutes(app);
uploadRoutes(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
	app.use(express.static('client/build'));


	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Listening on port', PORT);
});
