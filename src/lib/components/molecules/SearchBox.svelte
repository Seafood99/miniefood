<script>
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import Icon from '../atoms/Icon.svelte';

	let { 
		placeholder = 'Cari produk...',
		value = '',
		size = 'medium',
		variant = 'default',
		showButton = true,
		buttonText = 'Cari',
		onSearch,
		onInput = () => {},
		class: className = '',
		...restProps
	} = $props();

	const searchClasses = [
		'flex gap-2',
		className
	].filter(Boolean).join(' ');

	function handleSearch() {
		if (onSearch) {
			onSearch(value);
		}
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	function handleInput(event) {
		value = event.target.value;
		if (onInput) {
			onInput(event.target.value);
		}
	}
</script>

<div class={searchClasses} {...restProps}>
	<div class="flex-1">
		<Input
			{value}
			{placeholder}
			{size}
			{variant}
			onkeypress={handleKeyPress}
			oninput={handleInput}
			onchange={() => {}}
			class="flex-1"
		/>
	</div>
	
	{#if showButton}
		<Button 
			variant="primary" 
			{size} 
			onclick={handleSearch}
			class="flex-shrink-0"
		>
			<Icon name="search" size="small" />
			{#if buttonText}
				<span class="hidden sm:inline">{buttonText}</span>
			{/if}
		</Button>
	{/if}
</div>