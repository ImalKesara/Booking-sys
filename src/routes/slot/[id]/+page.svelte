<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import DeleteModal from '$lib/components/DeleteModal.svelte';
	import type { BookingSlot } from '$lib/server/db/schema';
	import { deleteSlot } from '$lib/state/modalState.svelte';
	import { onMount } from 'svelte';

	let slot: BookingSlot | null = $state(null);
	const id = page.params.id;

	const clear = async () => {
		await fetch(`/api/slots/${id}/clear`, { method: 'POST' });
		goto('/');
	};

	const handleDelete = async () => {
		await fetch(`/api/slots/${id}`, { method: 'DELETE' });
		deleteSlot.setFalse();
		goto('/');
	};

	onMount(async () => {
		const res = await fetch(`/api/slots/${id}`);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		slot = await res.json();
	});
</script>

{#if slot}
	<h1 class="p-4 text-2xl font-bold">SLot Detail</h1>
	<div class="space-y-2 text-sm">
		<div><strong>Code : </strong> <span class="uppercase">#{slot.bookingCode}</span></div>
		<div><strong>Time : </strong> {new Date(slot.starts).toLocaleString()}</div>
		<div><strong>Customer : </strong> {slot.customerName ?? '-'}</div>
		<div><strong>Phone : </strong> {slot.customerPhone ?? '-'}</div>
		<div>
			<strong>Status : </strong>
			{slot.status}
		</div>
	</div>

	<div class="mt-6 space-y-2">
		<button class="btn w-full btn-warning" onclick={clear}>Clear Book</button>
		<button class="btn w-full btn-error" onclick={() => deleteSlot.setTrue()}>Delete Slot</button>
		<button class="btn w-full btn-outline" onclick={() => goto('/')}>Go back</button>
	</div>
{:else}
	<span>Please wait</span>
	<span class="loading loading-xs loading-dots"></span>
{/if}

<DeleteModal id="my_modal_2" onConfirm={handleDelete} />
