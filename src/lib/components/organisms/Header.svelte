<script lang="ts">
	import Logo from '../atoms/Logo.svelte';
	import Button from '../atoms/Button.svelte';
	import Icon from '../atoms/Icon.svelte';
	import NavItem from '../molecules/NavItem.svelte';

	let { 
		navigationItems = [
			{ href: '/', label: 'Beranda', active: true },
			{ href: '/produk', label: 'Produk' },
			{ href: '/tentang', label: 'Tentang Kami' },
			{ href: '/kontak', label: 'Kontak' }
		],
		showCTA = true,
		ctaText = 'Pesan Sekarang',
		ctaHref = '/pesan',
		class: className = '',
		...restProps
	} = $props();

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Track scroll position
	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	function getHeaderClasses() {
		return [
			'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
			scrolled ? 'backdrop-blur-xl shadow-2xl' : 'backdrop-blur-sm',
			className
		].filter(Boolean).join(' ');
	}
</script>

<header 
	class={getHeaderClasses()} 
	style="background: {scrolled ? 'linear-gradient(135deg, rgba(43, 27, 23, 0.98) 0%, rgba(61, 43, 38, 0.98) 100%)' : 'linear-gradient(135deg, rgba(43, 27, 23, 0.95) 0%, rgba(61, 43, 38, 0.95) 100%)'}; border-bottom: 1px solid {scrolled ? 'rgba(255, 214, 0, 0.2)' : 'rgba(242, 226, 196, 0.1)'};"
	{...restProps}
>
	<!-- Decorative Top Border -->
	<div class="absolute top-0 left-0 right-0 h-1" 
		style="background: linear-gradient(to right, transparent, #FFD600 20%, #E53935 80%, transparent);"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center group">
					<Logo size="medium" class="rounded-full transition-transform duration-300 group-hover:scale-110" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden lg:flex items-center space-x-2">
				{#each navigationItems as item}
					<a
						href={item.href}
						class="relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 group"
						style="color: {item.active ? '#FFD600' : 'rgba(242, 226, 196, 0.8)'};"
					>
						<span class="relative z-10">{item.label}</span>
						
						<!-- Active Indicator -->
						{#if item.active}
							<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" 
								style="background: #FFD600;"></div>
						{/if}
						
						<!-- Hover Background -->
						<div class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
							style="background: rgba(255, 214, 0, 0.1);"></div>
					</a>
				{/each}
			</nav>

			<!-- Desktop CTA & Icons -->
			<div class="hidden lg:flex items-center gap-4">
				{#if showCTA}
					<a 
						href={ctaHref}
						class="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
						style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF; box-shadow: 0 4px 20px rgba(229, 57, 53, 0.4);"
					>
						{ctaText}
						<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<div class="lg:hidden">
				<button
					onclick={toggleMobileMenu}
					class="relative p-2 rounded-lg transition-all duration-300"
					style="color: #F2E2C4;"
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<!-- Close Icon -->
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Menu Icon -->
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="lg:hidden pb-6 animate-slide-down">
				<div class="h-px mb-4" style="background: linear-gradient(to right, transparent, rgba(242, 226, 196, 0.2), transparent);"></div>
				
				<nav class="flex flex-col space-y-1">
					{#each navigationItems as item}
						<a
							href={item.href}
							class="relative px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300"
							style="color: {item.active ? '#FFD600' : 'rgba(242, 226, 196, 0.8)'}; background: {item.active ? 'rgba(255, 214, 0, 0.1)' : 'transparent'};"
						>
							<span class="flex items-center justify-between">
								{item.label}
								{#if item.active}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
									</svg>
								{/if}
							</span>
						</a>
					{/each}
				</nav>
				
				{#if showCTA}
					<div class="mt-6 pt-4" style="border-top: 1px solid rgba(242, 226, 196, 0.1);">
						<a 
							href={ctaHref}
							class="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg"
							style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF;"
						>
							{ctaText}
							<svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Bottom Glow Effect -->
	<div class="absolute bottom-0 left-0 right-0 h-px opacity-50" 
		style="background: linear-gradient(to right, transparent, rgba(255, 214, 0, 0.3), transparent);"></div>
</header>

<!-- Spacer to prevent content jump -->
<div class="h-20"></div>

<style>
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.3s ease-out;
	}
</style>