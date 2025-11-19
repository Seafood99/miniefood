<script>
	let { 
		name,
		size = 'medium',
		color = 'current',
		class: className = '',
		...restProps
	} = $props();

	const sizeClasses = {
		small: 'w-4 h-4',
		medium: 'w-6 h-6',
		large: 'w-8 h-8',
		xl: 'w-12 h-12'
	};

	const colorClasses = {
		current: 'text-current',
		primary: 'text-amber-900',
		accent: 'text-red-600',
		secondary: 'text-yellow-500',
		white: 'text-white',
		gray: 'text-gray-500'
	};

	const iconClasses = [
		'inline-block flex-shrink-0',
		sizeClasses[size],
		colorClasses[color],
		className
	].filter(Boolean).join(' ');

	// Icon paths untuk berbagai icon yang dibutuhkan
	const icons = {
		menu: 'M4 6h16M4 12h16M4 18h16',
		close: 'm6 6 12 12m0-12L6 18',
		phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
		email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z m0 4 8 5 8-5',
		location: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z m-7-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
		heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
		star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
		cart: 'M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6',
		user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
		search: 'm21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
		arrow_right: 'm9 18 6-6-6-6',
		arrow_left: 'm15 18-6-6 6-6',
		check: 'm9 12 2 2 4-4',
		facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
		instagram: 'M7 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7zm5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm6.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
		whatsapp: 'M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3-.1-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.3-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2 3.3 4.9 4.5.7.3 1.2.4 1.6.5.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.1-.4-.2zM12 2a10 10 0 1 0 0 20c1.4 0 2.8-.3 4.1-.8l3.5 1.1-1.1-3.5c.5-1.3.8-2.7.8-4.1A10 10 0 0 0 12 2z'
	};
</script>

<svg 
	class={iconClasses}
	fill="none" 
	stroke="currentColor" 
	viewBox="0 0 24 24" 
	xmlns="http://www.w3.org/2000/svg"
	{...restProps}
>
	{#if icons[name]}
		{#if name === 'star' || name === 'heart'}
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="currentColor" d={icons[name]}></path>
		{:else}
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[name]}></path>
		{/if}
	{:else}
		<!-- Default icon jika nama tidak ditemukan -->
		<circle cx="12" cy="12" r="10"></circle>
		<path d="m9 12 2 2 4-4"></path>
	{/if}
</svg>