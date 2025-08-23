<script lang="ts">
	import { goto } from '$app/navigation';

	let date = $state('');
	let startTime = $state('');
	let endTime = $state('');

	const createSlot = async () => {
		if (!date || !startTime || !endTime) {
			alert('Invalid form data');
			return;
		}

		const starts = new Date(`${date}T${startTime}`);
		const ends = new Date(`${date}T${endTime}`);

		if (starts >= ends) {
			alert('End time must be after start time');
			return;
		}

		await fetch('/api/slots', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ starts, ends })
		});

		goto('/');
	};
</script>

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