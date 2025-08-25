<script lang="ts">
	import { alertModal } from '$lib/state/modalState.svelte';
	import { CircleX } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	let { errorMessage } = $props();
</script>

{#if alertModal.value}
	<div role="alert" class="fixed alert alert-error" transition:fade>
		<CircleX color="white" />
		<span class="font-bold text-white">Error! {errorMessage}.</span>
	</div>
{/if}
