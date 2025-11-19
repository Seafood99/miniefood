<script lang="ts">
	import Typography from '../atoms/Typography.svelte';
	import Logo from '../atoms/Logo.svelte';

	let {
		class: className = '',
		...restProps
	} = $props();

	const socialLinks = [
		{ 
			name: 'Instagram', 
			href: 'https://instagram.com/miniefood.indonesia', 
			gradient: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)'
		},
		{ 
			name: 'TikTok', 
			href: 'https://tiktok.com/@pempekminie', 
			gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
		},
		{ 
			name: 'WhatsApp', 
			href: 'https://wa.me/6289501988111', 
			gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
		}
	];

	const quickLinks = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Produk', href: '/produk' },
		{ label: 'Tentang Kami', href: '/tentang' },
		{ label: 'Kontak', href: '/kontak' }
	];

	const productLinks = [
		{ label: 'Pempek Kapal Selam', href: '/produk/pempek-kapal-selam' },
		{ label: 'Pempek Lenjer', href: '/produk/pempek-lenjer' },
		{ label: 'Tekwan', href: '/produk/tekwan' },
		{ label: 'Model', href: '/produk/model' }
	];

	const footerClasses = [
		'relative overflow-hidden',
		className
	].filter(Boolean).join(' ');
</script>

<footer class={footerClasses} {...restProps}>
	<!-- Background dengan tema serupa -->
	<div class="absolute inset-0" style="background: linear-gradient(180deg, #1a0f0d 0%, #2B1B17 50%, #1a0f0d 100%);"></div>
	
	<!-- Decorative Pattern -->
	<div class="absolute inset-0 opacity-[0.02]">
		<div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
	</div>

	<!-- Top Gradient Border -->
	<div class="absolute top-0 left-0 right-0 h-1" 
		style="background: linear-gradient(to right, transparent, #FFD600 20%, #E53935 50%, #FFD600 80%, transparent);"></div>

	<!-- Floating Elements -->
	<div class="absolute top-20 left-[5%] w-32 h-32 rounded-full opacity-5 blur-3xl" style="background: #FFD600;"></div>
	<div class="absolute bottom-20 right-[5%] w-40 h-40 rounded-full opacity-5 blur-3xl" style="background: #E53935;"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
			
			<!-- Brand & Description -->
			<div class="lg:col-span-1">
				<div class="mb-6">
					<Logo size="medium" class="text-white" />
				</div>
				<Typography variant="body" class="mb-6 leading-relaxed text-sm" style="color: rgba(242, 226, 196, 0.7);">
					Menyajikan cita rasa autentik Palembang dengan kualitas terbaik untuk keluarga Indonesia.
				</Typography>
				
				<!-- Social Media -->
				<div class="space-y-4">
					<Typography variant="h6" class="font-bold" style="color: #FFD600;">
						Ikuti Kami
					</Typography>
					<div class="flex gap-3">
						{#each socialLinks as social}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl overflow-hidden"
								style="background: {social.gradient};"
								aria-label={social.name}
							>
								<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
								{#if social.name === 'Instagram'}
									<svg class="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
									</svg>
								{:else if social.name === 'TikTok'}
									<svg class="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
									</svg>
								{:else if social.name === 'WhatsApp'}
									<svg class="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="lg:col-span-1">
				<div class="mb-6">
					<Typography variant="h6" class="font-bold mb-2" style="color: #F2E2C4;">
						Menu
					</Typography>
					<div class="h-1 w-12 rounded-full" style="background: linear-gradient(to right, #FFD600, #E53935);"></div>
				</div>
				<ul class="space-y-3">
					{#each quickLinks as link}
						<li>
							<a 
								href={link.href} 
								class="group inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
								style="color: rgba(242, 226, 196, 0.7);"
							>
								<span class="w-1.5 h-1.5 rounded-full transition-all duration-300" 
									style="background: rgba(255, 214, 0, 0.5);"></span>
								<span class="group-hover:text-[#FFD600] transition-colors duration-300">
									{link.label}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Product Links -->
			<div class="lg:col-span-1">
				<div class="mb-6">
					<Typography variant="h6" class="font-bold mb-2" style="color: #F2E2C4;">
						Produk Kami
					</Typography>
					<div class="h-1 w-12 rounded-full" style="background: linear-gradient(to right, #FFD600, #E53935);"></div>
				</div>
				<ul class="space-y-3">
					{#each productLinks as link}
						<li>
							<a 
								href={link.href} 
								class="group inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
								style="color: rgba(242, 226, 196, 0.7);"
							>
								<span class="w-1.5 h-1.5 rounded-full transition-all duration-300" 
									style="background: rgba(229, 57, 53, 0.5);"></span>
								<span class="group-hover:text-[#FFD600] transition-colors duration-300">
									{link.label}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Info -->
			<div class="lg:col-span-1">
				<div class="mb-6">
					<Typography variant="h6" class="font-bold mb-2" style="color: #F2E2C4;">
						Hubungi Kami
					</Typography>
					<div class="h-1 w-12 rounded-full" style="background: linear-gradient(to right, #FFD600, #E53935);"></div>
				</div>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" 
							style="background: rgba(255, 214, 0, 0.1);">
							<svg class="w-4 h-4" style="color: #FFD600;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<Typography variant="caption" class="text-sm leading-relaxed" style="color: rgba(242, 226, 196, 0.7);">
							Palembang, Sumatera Selatan
						</Typography>
					</div>
					
					<div class="flex items-start gap-3">
						<div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" 
							style="background: rgba(229, 57, 53, 0.1);">
							<svg class="w-4 h-4" style="color: #E53935;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
						</div>
						<a href="tel:+6289501988111" class="group">
							<Typography variant="caption" class="text-sm leading-relaxed group-hover:text-[#FFD600] transition-colors duration-300" style="color: rgba(242, 226, 196, 0.7);">
								+62 895 0198 8111
							</Typography>
						</a>
					</div>

					<div class="flex items-start gap-3">
						<div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" 
							style="background: rgba(255, 214, 0, 0.1);">
							<svg class="w-4 h-4" style="color: #FFD600;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<Typography variant="caption" class="text-sm leading-relaxed" style="color: rgba(242, 226, 196, 0.7);">
							Setiap Hari: 08:00 - 20:00
						</Typography>
					</div>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="h-px mb-8" style="background: linear-gradient(to right, transparent, rgba(255, 214, 0, 0.3), rgba(229, 57, 53, 0.3), transparent);"></div>

		<!-- Bottom Section -->
		<div class="flex flex-col md:flex-row justify-between items-center gap-4">
			<Typography variant="caption" class="text-sm text-center md:text-left" style="color: rgba(242, 226, 196, 0.6);">
				© 2024 MiniE Food. Semua hak dilindungi.
			</Typography>
			
			<div class="flex items-center gap-6">
				<a href="/privacy" class="text-sm transition-colors duration-300 hover:text-[#FFD600]" style="color: rgba(242, 226, 196, 0.6);">
					Kebijakan Privasi
				</a>
				<a href="/terms" class="text-sm transition-colors duration-300 hover:text-[#FFD600]" style="color: rgba(242, 226, 196, 0.6);">
					Syarat & Ketentuan
				</a>
			</div>
		</div>

		<!-- Love Badge -->
		<div class="mt-8 text-center">
			<a 
				href="https://github.com/Seafood99" 
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
			>
				<Typography variant="caption" class="text-xs flex items-center gap-2 group-hover:text-[#FFD600] transition-colors duration-300" style="color: rgba(242, 226, 196, 0.5);">
					Made by Seafood99
					<svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</Typography>
			</a>
		</div>
	</div>
</footer>

<style>
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>