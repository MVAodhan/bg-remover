<script lang="ts">
	import { profileStore } from '$lib/profile';
	import { userStore } from '$lib/supabase';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;

	async function signInWithGitHub() {
		await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	$: avatarUrl = $userStore?.user_metadata.avatar_url;
</script>

<nav>
	<div class="navbar bg-transparent">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/">Remove Bg</a>
		</div>
		<div class="flex-none">
			{#if $userStore}
				{#if $profileStore}
					<div class="mr-3">Credits: {$profileStore?.credits}</div>
				{/if}
				<div class="avatar">
					<div class="w-10 rounded-full">
						<img class="w-12 rounded-full" alt="avatar" src={avatarUrl} />
					</div>
				</div>
				<button
					class="btn btn-ghost"
					on:click={async () => {
						handleSignOut();
					}}>Sign Out</button
				>
			{/if}

			{#if !$userStore}
				<button class="btn" on:click={signInWithGitHub}>Sign in with Github</button>
			{/if}
		</div>
	</div>
</nav>
