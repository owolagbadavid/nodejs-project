import passport from 'passport';
import type { Request, Response, NextFunction, Express } from 'express';

export default (app: Express) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		}, (req: Request, res: Response, next: NextFunction) => {
			console.log('Inside passport. function');
			next();
		})
	);
	app.get( '/auth/google/callback', 
		passport.authenticate('google', 
			{failureRedirect: '/login', successRedirect: '/blogs'}) );

	app.get('/auth/logout', (req: Request, res: Response) => {
		req.logout(()=>{
			console.log('req.logout()');
		});
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
