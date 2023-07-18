<script lang="ts">
	import { profileStore } from '$lib/profile';

	let previewURL: string;
	let removedBgURL: string;

	let loading = false;

	let errorMessage: string | null;

	async function makeRequest(e: any) {
		loading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		let reader = new FileReader();
		reader.onloadend = async function () {
			let base64data = reader.result;
			const res = await fetch('/api/remove', {
				method: 'POST',
				body: JSON.stringify({ image: base64data }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			if (data.message) {
				errorMessage = data.message;
			}
			if (data.profile) {
				$profileStore = data.profile;
			}

			removedBgURL = data.image;
			loading = false;
		};

		reader.readAsDataURL(file);
	}

	async function downloadImage() {
		const response = await fetch(removedBgURL);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'removed.png';
		link.click();
		link.remove();
	}
</script>

<div class="flex w-full">
	{#if removedBgURL}
		<div class="w-1/2 flex justify-end pr-16">
			<img src={previewURL} alt="photoURL" width="256" height="256" />
		</div>
	{/if}
	{#if loading}
		<div class="w-full flex pl-10">
			<div class="w-full h-[256px] flex justify-center items-center">
				<span class="loading loading-spinner loading-lg" />
			</div>
		</div>
	{/if}
	{#if removedBgURL}
		<div class="w-1/2 flex justify-start pl-10">
			<img src={removedBgURL} alt="photoURL" width="256" height="256" />
		</div>
	{/if}
</div>
{#if !errorMessage}
	<div class="flex w-full justify-around items-center mt-12">
		<div class={`w-1/2 flex ${removedBgURL ? 'justify-end' : 'justify-center'}`}>
			<input
				type="file"
				accept="image/png, image/jpeg"
				class="file-input w-full max-w-xs"
				on:change={makeRequest}
			/>
		</div>
		{#if removedBgURL}
			<div class="w-1/2 flex justify-start pl-28">
				<button class="btn" on:click={downloadImage}> Download </button>
			</div>
		{/if}
	</div>
{/if}
{#if errorMessage}
	<div class="mt-3">
		<p>{errorMessage}</p>
	</div>
{/if}
