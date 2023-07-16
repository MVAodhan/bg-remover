import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import Replicate from 'replicate';

import { REPLICATE_API_KEY } from '$env/static/private';

const replicate = new Replicate({
	auth: REPLICATE_API_KEY
});

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session?.user.id)
		.single();
	if (!session || profile.credits <= 0) {
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

	if (output) {
		const credits = profile.credits;
		const newCredits = credits - 1;

		const { data, error } = await supabase
			.from('profiles')
			.update({ credits: newCredits })
			.eq('id', profile.id)
			.select();

		if (data) {
			console.log(data);
		}
		if (error) {
			console.log(error);
		}
	}

	return json({
		image: output
	});
};
