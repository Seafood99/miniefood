<script>
	import Icon from '../atoms/Icon.svelte';

	let { 
		href,
		active = false,
		icon,
		children,
		class: className = '',
		...restProps
	} = $props();

	const baseClasses = 'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out';
	const activeClasses = 'bg-red-600 text-white shadow-md';
	const inactiveClasses = 'text-amber-900 hover:bg-amber-50 hover:text-red-600';

	const navClasses = [
		baseClasses,
		active ? activeClasses : inactiveClasses,
		className
	].filter(Boolean).join(' ');
</script>

<a class={navClasses} {href} {...restProps}>
	{#if icon}
		<Icon name={icon} size="small" />
	{/if}
	{@render children?.()}
</a>