import buffer from 'buffer';
import Keygrip from 'keygrip';
import { cookieKey } from '../../config/keys';
import { User } from '../../types';

const keygrip = new Keygrip([cookieKey]);

export default (user: User) => {
	const Buffer = buffer.Buffer;
	const sessionObject = {
		passport: {
			user: user._id.toString(),
		},
	};
	const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

	const sig = keygrip.sign('session=' + session);

	return { session, sig };
};
