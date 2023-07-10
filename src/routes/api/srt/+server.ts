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
	// webhook: 'https://.../api/webhook',
	//	webhook_events_filter: ['completed']

	// body from Webhook
	// {
	// 	id: 'x3zrq3rbpnkls32emkvdkvukii',
	// 	version: 'b97ba81004e7132181864c885a76cae0e56bc61caa4190a395f6d8ba45b7a969',
	// 	input: {
	// 	  audio_path: 'https://pub-59d5752bee424d99a7899043d0340b9c.r2.dev/Highlights.mov',
	// 	  language: 'en',
	// 	  model_name: 'large-v2',
	// 	  vad_filter: true
	// 	},
	// 	logs: 'Transcribe with large-v2 model for the english language...\n' +
	// 	  'stream 0, timescale not set\n' +
	// 	  "00:00.320 --> 00:06.160  Hey friends, did you miss learn with Jason this week? Not to worry. Here's a highlight reel to get these transitions\n" +
	// 	  "00:06.160 --> 00:08.120  So you're saying that's built into the browser now\n" +
	// 	  "00:08.120 --> 00:14.500  We don't need to bring in a JavaScript library to do single page app. We can do it with a multi-page app. Exactly\n" +
	// 	  "00:14.500 --> 00:20.640  Yeah, that's cool. And we try that now we should see a nice little fade\n" +
	// 	  '00:20.800 --> 00:28.380  Fading fade out animation. Look at that. Okay, nice. And is this smart enough that if I like rotates?\n' +
	// 	  '00:29.960 --> 00:32.480  180 degrees will it it\n' +
	// 	  "00:32.480 --> 00:45.110  Mean it looks pretty nice, right? It's like you just don't have to do anything in it and it already feels\n" +
	// 	  "00:45.110 --> 00:52.310  So good comparatively. I know it's it's so cool. Like you can just sprinkle these few transitions around and just it's magic\n" +
	// 	  '00:52.310 --> 00:55.670  Yeah, this page to a blog post\n' +
	// 	  '00:55.830 --> 00:57.710  Which is already see\n' +
	// 	  '01:01.370 --> 01:01.750  Oh\n' +
	// 	  '01:01.750 --> 01:06.690  My god, this is watch watch everybody SPA. Yeah, I am clicking\n' +
	// 	  '01:06.690 --> 01:11.190  The forward and backwards buttons. Boop, you know if that looked like fun\n' +
	// 	  '01:11.190 --> 01:16.190  Just imagine how much fun it would be to watch the whole episode head over to learn with Jason dev. Watch it now\n',
	// 	output: {
	// 	  preview: "Hey friends, did you miss learn with Jason this week? Not to worry. Here's a highlight reel to get these transitions So you're saying that's built into the browser now We don't need to bring in a JavaScript library to do single page app. We can do it with a multi-page app. Exactly Yeah, that's cool. And we try that now we should see a nice little fade Fading fade out animation. Look at that. Okay, nice. And is this smart enough that if I like rotates?... (only the first 5 segments are shown, 9 more segments in subtitles)",
	// 	  srt_file: 'https://replicate.delivery/pbxt/rseUQa9M7s2AFCpNGppcVmVQ4g4imfj0oN9uPeeVvu7pZE6EB/tmpuxwfounnHighlights.en.srt',
	// 	  vtt_file: 'https://replicate.delivery/pbxt/I8t9ie06DMwCekxTBoUjpSg5AK0Y48pT7pBpgSheQ5V1MCdiA/tmpuxwfounnHighlights.en.vtt'
	// 	},
	// 	error: null,
	// 	status: 'succeeded',
	// 	created_at: '2023-07-10T19:35:52.850847Z',
	// 	started_at: '2023-07-10T19:44:01.586556Z',
	// 	completed_at: '2023-07-10T19:44:26.449036Z',
	// 	webhook: 'https://hot-squids-fry.loca.lt/api/webhook',
	// 	webhook_events_filter: [ 'completed' ],
	// 	metrics: { predict_time: 24.86248 },
	// 	urls: {
	// 	  cancel: 'https://api.replicate.com/v1/predictions/x3zrq3rbpnkls32emkvdkvukii/cancel',
	// 	  get: 'https://api.replicate.com/v1/predictions/x3zrq3rbpnkls32emkvdkvukii'
	// 	}
	//   }
	await replicate.predictions.create({
		version: 'b97ba81004e7132181864c885a76cae0e56bc61caa4190a395f6d8ba45b7a969',
		input: {
			audio_path: 'https://pub-59d5752bee424d99a7899043d0340b9c.r2.dev/Highlights.mov',
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
