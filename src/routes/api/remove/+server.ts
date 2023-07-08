import type { RequestHandler } from './$types';

import Replicate from 'replicate';

import { REPLICATE_API_KEY } from '$env/static/private';

const replicate = new Replicate({
	auth: REPLICATE_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const output = await replicate.run(
		'pollinations/modnet:da7d45f3b836795f945f221fc0b01a6d3ab7f5e163f13208948ad436001e2255',
		{
			input: {
				image: body.image
			}
		}
	);

	return new Response(
		JSON.stringify({
			image: output
		})
	);
};
