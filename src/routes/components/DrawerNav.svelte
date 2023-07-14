<script lang="ts">
	import { goto } from '$app/navigation';

	function handleDrawerClose() {
		const toggle = document.getElementById('my-drawer-4');
		if (toggle) {
			toggle.click();
		}
	}
</script>

<div class="flex flex-col justify-between h-full">
	<div class="flex justify-end">
		<button on:click={handleDrawerClose}>
			<div class="avatar">
				<div class="w-10 rounded-full">
					<img class="w-12 rounded-full" alt="avatar" />
				</div>
			</div>
		</button>
	</div>
	<div class="flex flex-col">
		<button
			class="btn btn-ghost"
			on:click={() => {
				goto('/');
				handleDrawerClose();
			}}
		>
			Profile</button
		>
		<button
			class="btn btn-ghost"
			on:click={() => {
				goto('/remove');
				handleDrawerClose();
			}}
		>
			Remove Bg</button
		>
	</div>
	<div>
		<button
			class="btn btn-ghost w-full"
			on:click={async () => {
				handleDrawerClose();
			}}>Sign Out</button
		>
	</div>
</div>
