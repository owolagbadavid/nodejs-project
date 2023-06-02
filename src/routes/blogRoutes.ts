import { model } from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import { Request, Response } from 'express';

const Blog = model('Blog');

export default app => {
  app.get('/api/blogs/:id', requireLogin, async (req: Request, res: Response) => {
    const blog = await Blog.findOne({
      _user: (req.user as any).id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req: Request, res: Response) => {
    const blogs = await Blog.find({ _user: (req.user as any).id });

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: (req.user as any).id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
