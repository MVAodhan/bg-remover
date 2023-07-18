import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

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
		return json({
			message: 'You have insufficent credits to run this service',
			image: null,
			profile: null
		});
	}
	const body = await request.json();

	const output = await replicate.run(
		'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003',
		{
			input: {
				image: body.image
			}
		}
	);
	let newProfileData;
	if (output) {
		const credits = profile.credits;
		const newCredits = credits - 1;

		const { data: newProfile } = await supabase
			.from('profiles')
			.update({ credits: newCredits })
			.eq('id', profile.id)
			.select()
			.single();
		newProfileData = newProfile;
		return json({
			message: null,
			image: output,
			profile: newProfileData
		});
	}
	return json({
		message: null,
		image: null,
		profile: null
	});
};
