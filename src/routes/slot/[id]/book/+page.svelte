<script lang="ts">
	import type { BookingSlot } from '$lib/server/db/schema';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let slot: BookingSlot | null = $state(null);
	type Name = string;
	type PhoneNumber = string;
	const id = page.params.id;
	let cusName: Name = $state('');
	let phoneNumber: PhoneNumber = $state('');

	const save = async () => {
		if (!slot) return;
		await fetch(`/api/slots/${slot.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				customerName: cusName,
				customerPhone: phoneNumber,
				status: 'booked'
			})
		});
		goto('/');
	};

	onMount(async () => {
		const res = await fetch(`/api/slots/${id}`);
		slot = await res.json();
	});
</script>

{#if slot}
	<h1 class="p-4 text-2xl font-bold">Book slot</h1>
	<div class="space-y-4">
		<div class="text-sm opacity-60">
			{new Date(slot.starts).toLocaleString()} - {new Date(slot.ends).toLocaleTimeString()}
		</div>

		<input
			type="text"
			class="input-bordered input w-full"
			placeholder="Customer Name"
			bind:value={cusName}
		/>
		<input
			type="text"
			class="input-bordered input w-full"
			placeholder="Phone Name"
			bind:value={phoneNumber}
		/>

		<button class="btn mt-2 w-full btn-primary" onclick={save}>Book slot</button>
		<button class="btn mt-2 w-full btn-outline" onclick={() => goto('/')}>Cancel</button>
	</div>
{:else}
	<span class="loading loading-xs loading-dots"></span>
{/if}
