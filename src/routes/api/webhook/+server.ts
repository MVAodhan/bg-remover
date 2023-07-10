import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ webhook: 'success' }));
};
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	console.log(body);
	return new Response(JSON.stringify({ webhook: 'post success' }));
};
