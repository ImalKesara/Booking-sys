<script lang="ts">
	import { goto } from '$app/navigation';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { alertModal } from '$lib/state/modalState.svelte';

	let date = $state('');
	let startTime = $state('');
	let endTime = $state('');
	let errorMessage = $state('');

	const createSlot = async () => {
		if (!date || !startTime || !endTime) {
			alertModal.setTrue();
			errorMessage = 'Invalid Form data';
			setTimeout(() => {
				alertModal.setFalse();
			}, 2000);
			return;
		}

		const starts = new Date(`${date}T${startTime}`);
		const ends = new Date(`${date}T${endTime}`);

		if (starts >= ends) {
			alertModal.setTrue();
			errorMessage = 'End time must be after start time';
			setTimeout(() => {
				alertModal.setFalse();
			}, 2000);
			return;
		}

		await fetch('/api/slots', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ starts, ends })
			// body: JSON.stringify({starts : starts, ends :ends })
		});
		goto('/');
	};
</script>

<div class="flex justify-center">
	<ErrorModal {errorMessage} />
</div>

<div class="breadcrumbs text-sm">
	<ul>
		<li><a href={`/`}>Home</a></li>
		<li>Create New Slot</li>
	</ul>
</div>
<h2 class="mb-4 text-xl font-bold">Create New Slot</h2>

<div class="space-y-4">
	<div>
		<label class="label" for="date">Date</label>
		<input id="date" type="date" bind:value={date} class="input-bordered input w-full" />
	</div>

	<div>
		<label class="label" for="startTime">Start Time</label>
		<input id="startTime" type="time" bind:value={startTime} class="input-bordered input w-full" />
	</div>

	<div>
		<label class="label" for="endTime">End Time</label>
		<input id="endTime" type="time" bind:value={endTime} class="input-bordered input w-full" />
	</div>

	<button class="btn w-full btn-primary" onclick={createSlot}> Create Slot </button>
	<button class="btn w-full btn-outline" onclick={() => goto('/')}> Cancel </button>
</div>
