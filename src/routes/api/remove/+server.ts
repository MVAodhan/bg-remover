import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import Replicate from 'replicate';

import { REPLICATE_API_KEY } from '$env/static/private';

const replicate = new Replicate({
	auth: REPLICATE_API_KEY
});

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		// the user is not signed in
		throw error(401, { message: 'Unauthorized' });
	}
	const body = await request.json();

	const output = await replicate.run(
		'pollinations/modnet:da7d45f3b836795f945f221fc0b01a6d3ab7f5e163f13208948ad436001e2255',
		{
			input: {
				image: body.image
			}
		}
	);

	return json({
		image: output
	});
};
