<script>
	import logoImage from '$lib/assets/logo.jpg';
	
	let { 
		size = 'medium',
		variant = 'full',
		class: className = '',
		...restProps
	} = $props();

	const sizeClasses = {
		small: 'h-8',
		medium: 'h-12',
		large: 'h-16'
	};

	const logoClasses = [
		'object-contain',
		sizeClasses[size],
		className
	].filter(Boolean).join(' ');
</script>

{#if variant === 'icon'}
	<img 
		src={logoImage} 
		alt="MiniE Food" 
		class={logoClasses} 
		{...restProps}
	/>
{:else}
	<img 
		src={logoImage} 
		alt="MiniE Food" 
		class={logoClasses} 
		{...restProps}
	/>
{/if}