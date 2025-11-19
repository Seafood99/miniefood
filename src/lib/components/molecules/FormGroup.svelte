<script>
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import Typography from '../atoms/Typography.svelte';

	let { 
		fields = [],
		submitText = 'Submit',
		submitVariant = 'primary',
		onSubmit,
		loading = false,
		class: className = '',
		...restProps
	} = $props();

	const formClasses = [
		'space-y-4',
		className
	].filter(Boolean).join(' ');

	// Initialize form data
	let formData = $state({});

	// Initialize form data with default values properly
	$effect(() => {
		const initialData = {};
		for (const field of fields) {
			if (field.name) {
				initialData[field.name] = field.defaultValue || '';
			}
		}
		formData = initialData;
	});

	function handleSubmit(event) {
		event.preventDefault();
		if (onSubmit) {
			onSubmit(formData);
		}
	}

	function handleFieldChange(fieldName, value) {
		formData = { ...formData, [fieldName]: value };
	}
</script>

<form class={formClasses} onsubmit={handleSubmit} {...restProps}>
	{#each fields as field}
		<div>
			{#if field.type === 'textarea'}
				<textarea
					class="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
					rows="4"
					name={field.name}
					placeholder={field.placeholder}
					required={field.required}
					disabled={field.disabled || loading}
					value={formData[field.name] || ''}
					oninput={(e) => handleFieldChange(field.name, e.target.value)}
				></textarea>
			{:else}
				<Input
					type={field.type || 'text'}
					label={field.label}
					placeholder={field.placeholder}
					required={field.required}
					disabled={field.disabled || loading}
					error={field.error}
					errorMessage={field.errorMessage}
					size={field.size || 'medium'}
					variant={field.variant || 'default'}
					value={formData[field.name] || ''}
					onchange={(e) => handleFieldChange(field.name, e.target.value)}
					oninput={(e) => handleFieldChange(field.name, e.target.value)}
					id={field.name}
				/>
			{/if}
		</div>
	{/each}

	<Button 
		type="submit" 
		variant={submitVariant} 
		size="large" 
		disabled={loading}
		class="w-full"
		onclick={() => {}}
	>
		{loading ? 'Loading...' : submitText}
	</Button>
</form>