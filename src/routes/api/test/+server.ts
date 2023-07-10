import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ test: 'success in development' }));
};
