<script lang="ts">
	let previewURL: string;
	let removedBgURL: string;
	async function makeRequest(e: any) {
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
			removedBgURL = data.image;
		};

		reader.readAsDataURL(file);
	}
</script>

<section class="w-4/5 h-full flex flex-col justify-center items-center">
	<div class="flex">
		{#if previewURL}
			<img src={previewURL} alt="photoURL" width="256" height="256" class="mx-auto" />
		{/if}
		{#if removedBgURL}
			<img src={removedBgURL} alt="photoURL" width="256" height="256" class="mx-auto" />
		{/if}
	</div>

	<input
		type="file"
		accept="image/png"
		class="file-input w-full max-w-xs mt-2"
		on:change={makeRequest}
	/>
</section>
