<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { alertModal } from '$lib/state/modalState.svelte';

	let email = $state('');
	let password = $state('');
	let errorMsg = $state<string | undefined>(undefined);

	const login = async () => {
		const { data, error } = await authClient.signIn.email({
			email: email,
			password: password, // required
			rememberMe: true,
			callbackURL: '/'
		});
		if (error) {
			alertModal.setTrue();
			const clear = setTimeout(() => {
				alertModal.setFalse();
			}, 1500);
			() => clearTimeout(clear);
			errorMsg = error.message;
			return;
		}
	};
</script>

<div class="flex justify-center">
	<ErrorModal errorMessage={errorMsg} />
</div>

<div class="flex min-h-screen items-center justify-center">
	<form class="w-full max-w-sm space-y-4 p-6" onsubmit={login}>
		<div>
			<label class="label" for="email">E-Mail Address </label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="input-bordered input w-full"
				placeholder="Type email address "
			/>
		</div>

		<div>
			<label class="label" for="password">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				class="input-bordered input w-full"
				placeholder="Type password "
			/>
		</div>

		<button class="btn w-full btn-primary" onclick={login}> login </button>
	</form>
</div>
