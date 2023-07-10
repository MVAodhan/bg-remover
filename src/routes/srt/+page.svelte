<script lang="ts">
	let previewURL: string;
	async function makeRequest(e: any) {
		const res = await fetch('/api/srt', {
			method: 'POST',
			body: JSON.stringify({
				some: 'message'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();
		console.log(data);
	}
</script>

<section class="w-4/5 h-full flex flex-col justify-center items-center">
	<!-- {#if previewURL}
		 svelte-ignore a11y-media-has-caption 
		<video controls width="250">
			<source src={previewURL} type="video/mov" />
		</video>
	{/if} -->
	<input type="file" accept="video/*" class="file-input w-full max-w-xs" on:change={makeRequest} />
</section>
