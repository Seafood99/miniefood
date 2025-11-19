<script>
	let { 
		variant = 'primary',
		size = 'medium',
		disabled = false,
		type = 'button',
		children,
		onclick = () => {},
		class: className = '',
		...restProps
	} = $props();

	const baseClasses = 'inline-flex items-center justify-center gap-2 border-0 rounded-lg font-medium text-center cursor-pointer transition-all duration-150 ease-in-out whitespace-nowrap select-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';

	const variantClasses = {
		primary: 'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm',
		secondary: 'bg-yellow-400 text-amber-900 shadow-sm hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm',
		outline: 'bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:-translate-y-0.5',
		ghost: 'bg-transparent text-amber-900 hover:bg-amber-50',
		danger: 'bg-red-700 text-white shadow-sm hover:bg-red-800 hover:-translate-y-0.5 hover:shadow-md'
	};

	const sizeClasses = {
		small: 'px-4 py-2 text-sm min-h-8',
		medium: 'px-6 py-3 text-base min-h-10',
		large: 'px-8 py-4 text-lg min-h-12'
	};

	const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';

	const buttonClasses = [
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		disabled && disabledClasses,
		className
	].filter(Boolean).join(' ');
</script>

<button
	class={buttonClasses}
	{type}
	{disabled}
	onclick={onclick}
	{...restProps}
>
	{@render children?.()}
</button>