import type { RequestHandler } from './$types';

import Replicate from 'replicate';

import { REPLICATE_API_KEY } from '$env/static/private';

const replicate = new Replicate({
	auth: REPLICATE_API_KEY
});

export const POST: RequestHandler = async () => {
	// example public hosted highlights video
	// see r2.txt for example
	// public access is off now
	await replicate.predictions.create({
		version: 'b97ba81004e7132181864c885a76cae0e56bc61caa4190a395f6d8ba45b7a969',
		input: {
			audio_path: '<cloudflare-storage-url>',
			model_name: 'large-v2',
			language: 'en',
			vad_filter: true
		}
	});

	return new Response(
		JSON.stringify({
			status: 'srt queued'
		})
	);
};
