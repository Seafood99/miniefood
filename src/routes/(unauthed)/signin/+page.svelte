<script>
	import { signIn } from '$lib/controllers/auth.remote';

	const { username, password } = signIn.fields;
</script>

<form {...signIn}>
	<input {...username.as('text')} placeholder="Username" />
	<input {...password.as('password')} placeholder="Password" />

	{#each signIn.fields.username.issues() as issue}
		<p class="text-red-500">{issue.message}</p>
	{/each}

	<button>Sign In</button>
</form>
