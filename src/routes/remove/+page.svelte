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
			console.log(data);
			removedBgURL = data.image;
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

<section class="w-4/5 h-full flex flex-col justify-center items-center">
	<div class="flex w-full">
		{#if previewURL}
			<div class="w-1/2 flex justify-end pr-16">
				<img src={previewURL} alt="photoURL" width="256" height="256" />
			</div>
		{/if}
		{#if removedBgURL}
			<div class="w-1/2 flex justify-start pl-10">
				<img src={removedBgURL} alt="photoURL" width="256" height="256" />
			</div>
		{/if}
	</div>

	<div class="flex w-full justify-around items-center mt-12">
		<div class={`w-1/2 flex ${removedBgURL ? 'justify-end' : 'justify-center'}`}>
			<input
				type="file"
				accept="image/png"
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
</section>
