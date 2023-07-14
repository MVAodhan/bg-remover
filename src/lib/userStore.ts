import { writable } from 'svelte/store';

type UserData = {
	id: string;
	email: string;
	app_metadata: unknown;
	user_metadata: {
		avatar_url: string;
		email: string;
		email_verified: boolean;
		full_name: string;
		iss: string;
		name: string;
		preferred_username: string;
		provider_id: string;
		sub: string;
		user_name: string;
	};
};

export const userStore = writable<UserData | null>();