<script lang="ts">
	import DrawerNav from './/components/DrawerNav.svelte';

	export let supabase: SupabaseClient;

	import '../app.css';
	import type { SupabaseClient } from '@supabase/supabase-js';

	async function signInWithGitHub() {
		await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<nav>
	<div class="navbar bg-transparent">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/">ML TOOLS</a>
		</div>
		<div class="flex-none">
			<div class="drawer drawer-end">
				<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content">
					<!-- Page content here -->

					<label for="my-drawer-4" class="drawer-button">
						<div class="avatar">
							<div class="w-10 rounded-full">
								<img class="w-12 rounded-full" alt="avatar" />
							</div>
						</div>
					</label>

					<button class="btn" on:click={handleSignOut}>Sign out</button>
					<button class="btn" on:click={signInWithGitHub}>Sign in with Github</button>
				</div>
				<div class="drawer-side">
					<label for="my-drawer-4" class="drawer-overlay" />
					<div class="menu p-4 w-80 h-full bg-base-200 text-base-content">
						<!-- Sidebar content here -->
						<DrawerNav />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
