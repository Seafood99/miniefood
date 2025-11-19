<script>
	let { 
		tag = 'p',
		variant = 'body',
		size = null,
		weight = null,
		color = 'primary',
		align = 'left',
		children,
		class: className = '',
		...restProps
	} = $props();

	const variantClasses = {
		h1: 'text-4xl md:text-5xl font-bold font-heading leading-tight mb-2',
		h2: 'text-3xl md:text-4xl font-bold font-heading leading-tight mb-2',
		h3: 'text-2xl font-bold font-heading leading-tight mb-2',
		h4: 'text-xl font-semibold font-heading leading-tight mb-2',
		h5: 'text-lg font-semibold font-heading leading-tight mb-2',
		h6: 'text-base font-semibold font-heading leading-tight mb-2',
		body: 'text-base leading-relaxed mb-4',
		caption: 'text-sm leading-normal',
		lead: 'text-lg leading-relaxed mb-4'
	};

	const sizeClasses = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl',
		'5xl': 'text-5xl'
	};

	const weightClasses = {
		light: 'font-light',
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};

	const colorClasses = {
		primary: 'text-amber-900',
		secondary: 'text-amber-700',
		light: 'text-amber-600',
		accent: 'text-red-600'
	};

	const alignClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	const typographyClasses = [
		'm-0',
		variantClasses[variant],
		size && sizeClasses[size],
		weight && weightClasses[weight],
		colorClasses[color],
		alignClasses[align],
		className
	].filter(Boolean).join(' ');
</script>

<svelte:element 
	this={tag} 
	class={typographyClasses}
	{...restProps}
>
	{@render children?.()}
</svelte:element>