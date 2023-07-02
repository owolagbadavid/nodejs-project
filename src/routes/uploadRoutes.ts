import type { Express } from 'express';
import keys from '../config/keys';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import requireLogin from '../middlewares/requireLogin';
// import * as AWS from 'aws-sdk';

// const s32 = new AWS.S3({
// 	accessKeyId: keys.accessKeyId,
// 	secretAccessKey: keys.secretAccessKey,
// });
const s3 = new S3({
	credentials :{accessKeyId: keys.accessKeyId,
		secretAccessKey: keys.secretAccessKey},
	region: 'eu-north-1',                    
});


export default (app: Express) => {


	app.get('/api/upload', requireLogin, async (req, res) => {

		const key = `${req.user.id}/${uuidv4()}.jpeg`;

		const command = new PutObjectCommand({
			Bucket: 'nodejs-blog',
			Key: key,
			ContentType: 'image/jpeg',
		});
    

		const url = await getSignedUrl(s3, command);
		res.send({ key, url });
	});

};