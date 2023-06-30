import type { Express } from 'express';
import keys from '../config/keys';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
	accessKeyId: keys.accessKeyId,
	secretAccessKey: keys.secretAccessKey,
});

export default (app: Express) => {

	app.get('/api/upload', (req, res) => {
		res.send('hello');
	});

};