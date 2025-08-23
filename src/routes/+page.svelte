<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BookingSlot } from '$lib/server/db/schema';
	import { onMount } from 'svelte';

	let slots: BookingSlot[] = $state([]);

	function handleClick(slot: BookingSlot) {
		if (slot.status === 'available') {
			goto(`/slot/${slot.id}/book`);
		} else {
			goto(`/slot/${slot.id}`);
		}
	}

	const slotLabel = (slot: BookingSlot) => {
		const start = new Date(slot.starts);
		return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	onMount(async () => {
		const res = await fetch('/api/slots');
		slots = await res.json();
	});
</script>

<div class="flex justify-between align-middle">
	<p class="mb-4 text-3xl font-bold">Time Slots</p>
	<a href="/slot/new" class="btn btn-primary px-10">+Add</a>
</div>

<div class="divider"></div>

<div class=" grid grid-cols-2 gap-4">
	{#each slots as slot (slot.id)}
		<button
			class="btn w-full justify-between border-2"
			class:btn-outline={slot.status === 'available'}
			class:btn-accent={slot.status === 'booked'}
			class:btn-warning={slot.status === 'started'}
			class:btn-success={slot.status === 'completed'}
			class:btn-error={slot.status === 'no_show'}
			onclick={() => handleClick(slot)}
		>
			<div>
				{slotLabel(slot)} -{slot.customerName ?? 'Available'}
			</div>

			<div class="badge">
				{slot.status}
			</div>
		</button>
	{/each}
</div>
