<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from './Nav.svelte';
	import '../app.css';
	import { userStore } from '$lib/supabase';
	import { profileStore } from '$lib/profile';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: (async function () {
		const { data: profile } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', session?.user.id)
			.single();
		$profileStore = profile;
	})();

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			$userStore = _session?.user;
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="w-screen h-screen">
	<Nav {supabase} />
	<main class="flex justify-center w-full h-full">
		<slot />
	</main>
</div>
