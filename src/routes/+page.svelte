<script lang="ts">
	import ImageDownload from './/components/ImageDownload.svelte';
	import { userStore } from '$lib/supabase';
</script>

<section class="w-4/5 h-full flex flex-col justify-center items-center">
	{#if $userStore}
		<ImageDownload />
	{:else}
		<p>Please sign in to use this service</p>
	{/if}
</section>
