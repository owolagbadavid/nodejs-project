import { model } from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import { Request, Response, Express } from 'express';

// import { clearHash } from '../services/cache';
import cleanCache from '../middlewares/cleanCache';

const Blog = model('Blog');

export default (app: Express) => {
	app.get('/api/blogs/:id', requireLogin, async (req: Request, res: Response) => {
		const blog = await Blog.findOne({
			
			_user: req.user.id,
			_id: req.params.id
		});

		res.send(blog);
	});

	app.get('/api/blogs', requireLogin, cleanCache, async (req: Request, res: Response) => {
		const blogs = await (Blog.find({ _user: req.user.id }) )
			.cache({
				key: req.user.id
			});

		res.send(blogs);
	});

	app.post('/api/blogs', requireLogin, async (req: Request, res: Response) => {

		const { title, content, imageUrl } = req.body;
    
		const blog = new Blog({
			imageUrl,
			title,
			content,
			_user: req.user.id
		});

		try {
			await blog.save();
			res.send(blog);
		} catch (err) {
			res.status(400).send(err);
		}
	});
};
