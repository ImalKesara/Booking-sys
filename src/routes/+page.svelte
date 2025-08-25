<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BookingSlot } from '$lib/server/db/schema';
	import { groupByDateSlots } from '$lib/utils';
	import { onMount } from 'svelte';

	let slots: BookingSlot[] = $state([]);
	let groupedSlots: Record<string, BookingSlot[]> = $state({});

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
		const data: BookingSlot[] = await res.json();
		const slots = data.map((slot) => {
			return { ...slot, starts: new Date(slot.starts), ends: new Date(slot.ends) };
		});
		console.log(slots);
		groupedSlots = groupByDateSlots(slots);
		// console.log(groupedSlots)
	});
</script>

<div class="flex justify-between align-middle">
	<p class="mb-4 text-3xl font-bold">Time Slots</p>
	<a href="/slot/new" class="btn px-10 btn-primary">+Add</a>
</div>

<div class="divider"></div>

<div class="space-y-4">
	{#each Object.entries(groupedSlots) as [date, slots]}
		<h3>{date}</h3>
		{#each slots as slot (slot.id)}
			<button
				class="btn w-full border-[0.1px] border-gray-500 rounded-none justify-between shadow-none"
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

				<div class="badge badge-warning rounded-none uppercase">
					{slot.status}
				</div>
			</button>
		{/each}
	{/each}
</div>
