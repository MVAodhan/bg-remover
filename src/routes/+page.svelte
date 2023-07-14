<script lang="ts">
	import Nav from './Nav.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	// $: console.log('page data', data);
	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<h1>Home</h1>
