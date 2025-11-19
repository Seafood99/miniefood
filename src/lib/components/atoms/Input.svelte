<script>
	let { 
		type = 'text',
		size = 'medium',
		variant = 'default',
		value = '',
		placeholder = '',
		disabled = false,
		required = false,
		error = false,
		errorMessage = '',
		label = '',
		id = '',
		onchange = () => {},
		oninput = () => {},
		class: className = '',
		...restProps
	} = $props();

	const baseClasses = 'w-full border rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500';

	const sizeClasses = {
		small: 'px-3 py-2 text-sm',
		medium: 'px-4 py-3 text-base',
		large: 'px-5 py-4 text-lg'
	};

	const variantClasses = {
		default: 'border-gray-300 bg-white text-amber-900 placeholder-gray-400',
		outline: 'border-2 border-red-600 bg-transparent text-amber-900 placeholder-gray-400',
		filled: 'border-transparent bg-gray-100 text-amber-900 placeholder-gray-500'
	};

	const errorClasses = 'border-red-500 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500 focus:border-red-500';
	const disabledClasses = 'opacity-60 cursor-not-allowed bg-gray-100';

	const inputClasses = [
		baseClasses,
		sizeClasses[size],
		error ? errorClasses : variantClasses[variant],
		disabled && disabledClasses,
		className
	].filter(Boolean).join(' ');

	const labelClasses = [
		'block text-sm font-medium mb-2',
		error ? 'text-red-700' : 'text-amber-900'
	].join(' ');
</script>

<div class="w-full">
	{#if label}
		<label class={labelClasses}>
			{label}
			{#if required}
				<span class="text-red-500 ml-1">*</span>
			{/if}
		</label>
	{/if}
	
	<input
		{type}
		class={inputClasses}
		bind:value
		{placeholder}
		{disabled}
		{required}
		{onchange}
		{oninput}
		{...restProps}
	/>
	
	{#if error && errorMessage}
		<p class="mt-2 text-sm text-red-600">{errorMessage}</p>
	{/if}
</div>