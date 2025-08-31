<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { alertModal } from '$lib/state/modalState.svelte';

	let email: string = $state('');
	let password: string = $state('');
	let name: string = $state('');
	let errorMsg = $state<string | undefined>(undefined);

	async function handleSignup() {
		try {
			const { data, error } = await authClient.signUp.email({
				name,
				email: email,
				password,
				image: 'https://example.com/image.png',
				callbackURL: `/`
			});

			if (error) {
				alertModal.setTrue();
				const clear = setTimeout(() => {
					alertModal.setFalse();
				}, 1500);
				() => clearTimeout(clear);
				errorMsg = error.message;
			}
		} catch (err) {
			errorMsg = 'Signup failed. Please try again.';
		}
	}
</script>

<div class="flex justify-center">
	<ErrorModal errorMessage={errorMsg} />
</div>

<div class="flex min-h-screen items-center justify-center">
	<form onsubmit={handleSignup} class="w-full max-w-sm space-y-4 p-6">
		<div class="space-y-4">
			<label for="name" class="mb-2">Name</label>
			<input
				placeholder="Your name"
				class="input w-full input-neutral"
				id="name"
				type="text"
				bind:value={name}
			/>

			<label for="email" class="mb-2">Email:</label>
			<input
				placeholder="Email"
				class="input w-full input-neutral"
				id="email"
				type="email"
				bind:value={email}
			/>

			<label for="password" class="mb-2">Password:</label>
			<input
				type="password"
				id="password"
				placeholder="Password"
				class="input w-full input-neutral"
				bind:value={password}
			/>

			<button type="submit" class="btn mt-4 w-full btn-primary">Sign Up</button>
		</div>
	</form>
</div>
