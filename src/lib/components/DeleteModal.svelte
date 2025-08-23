<script lang="ts">
	import { deleteSlot } from '$lib/state/modalState.svelte';
	let { id, onConfirm} = $props();
</script>

<dialog {id} class="modal" class:modal-open={deleteSlot.value}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Are you sure ?</h3>
		<p class="py-4">This action cant undo</p>

		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn w-20 btn-error" onclick={onConfirm}>Yes</button>
				<button class="btn w-20 btn-outline" onclick={() => deleteSlot.setFalse()}>Close</button>
			</form>
		</div>
	</div>
</dialog>
