<script lang="ts">
	import type { BookingSlot } from '$lib/server/db/schema';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let slot: BookingSlot | null = $state(null);
	const id = page.params.id;

	onMount(async () => {
		const res = await fetch(`/api/slots/${id}`);
		slot = await res.json();
	});
</script>

{#if slot}
	<h1 class="p-4 text-2xl font-bold">Book slot</h1>
	<h1>{slot.bookingCode}</h1>
	<div class="space-y-4">
		<div class="text-sm opacity-60">
			{new Date(slot?.starts)}
		</div>
	</div>
{:else}
	<span class="loading loading-xs loading-dots"></span>
{/if}
