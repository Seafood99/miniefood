<script lang="ts">
	import Typography from '../atoms/Typography.svelte';
	import Button from '../atoms/Button.svelte';
	import SearchBox from '../molecules/SearchBox.svelte';

	let { 
		title = 'Rasakan Kelezatan Produk MiniEFood',
		subtitle = 'Produk makanan berkualitas tinggi dengan cita rasa autentik Indonesia',
		description = 'Dibuat dengan bahan-bahan pilihan dan proses yang higienis untuk memberikan pengalaman kuliner terbaik bagi keluarga Anda.',
		backgroundImage = '/hero-bg.jpg',
		showCTA = true,
		primaryCTAText = 'Jelajahi Produk',
		primaryCTAHref = '/produk',
		secondaryCTAText = 'Pelajari Lebih Lanjut',
		secondaryCTAHref = '/tentang',
		showSearch = true,
		searchPlaceholder = 'Cari produk favorit Anda...',
		onSearch,
		class: className = '',
		...restProps
	} = $props();

	let searchValue = $state('');

	function handleSearch(query: string) {
		if (onSearch) {
			onSearch(query);
		}
	}

	const heroClasses = [
		'relative min-h-screen flex items-center justify-center overflow-hidden',
		className
	].filter(Boolean).join(' ');
</script>

<section class={heroClasses} {...restProps}>
	<!-- Background Layers menggunakan warna dari globals.css -->
	<div class="absolute inset-0" style="background: linear-gradient(135deg, #2B1B17 0%, #4a3530 50%, #2B1B17 100%);"></div>
	
	{#if backgroundImage}
		<div 
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image: url({backgroundImage}); opacity: 0.25; mix-blend-mode: soft-light;"
		></div>
	{/if}
	
	<!-- Animated Overlay dengan warna packaging-yellow dan spicy-red -->
	<div class="absolute inset-0 opacity-20">
		<div class="absolute inset-0 bg-gradient-to-tr from-[#FFD600]/30 via-transparent to-[#E53935]/30 animate-gradient"></div>
	</div>
	
	<!-- Decorative Pattern -->
	<div class="absolute inset-0 opacity-[0.03]">
		<div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
	</div>

	<!-- Main Content -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
			
			<!-- Left Column - Content -->
			<div class="text-center lg:text-left space-y-8">

				<!-- Main Title -->
				<div>
					<Typography 
						tag="h1" 
						variant="h1" 
						class="font-black leading-[1.1] tracking-tight mb-6 animate-slide-up"
						style="color: #F2E2C4; font-size: clamp(2.5rem, 5vw, 4.5rem); text-shadow: 0 2px 30px rgba(229, 57, 53, 0.3);"
					>
						{title}
					</Typography>
				</div>

				<!-- Subtitle -->
				{#if subtitle}
					<Typography 
						tag="h2" 
						variant="h4" 
						class="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed animate-slide-up"
						style="color: #FFD600; animation-delay: 0.1s;"
					>
						{subtitle}
					</Typography>
				{/if}

				<!-- Description -->
				{#if description}
					<Typography 
						variant="lead" 
						class="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in"
						style="color: rgba(242, 226, 196, 0.85); animation-delay: 0.2s;"
					>
						{description}
					</Typography>
				{/if}

				<!-- CTA Buttons -->
				{#if showCTA}
					<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in pt-4" style="animation-delay: 0.3s;">
						{#if primaryCTAText}
							<a 
								href={primaryCTAHref}
								class="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[200px]"
								style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF; box-shadow: 0 10px 40px rgba(229, 57, 53, 0.4);"
							>
								{primaryCTAText}
								<svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</a>
						{/if}
						
						{#if secondaryCTAText}
							<a 
								href={secondaryCTAHref}
								class="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 min-w-[200px] backdrop-blur-sm"
								style="border-color: #F2E2C4; color: #F2E2C4; background: rgba(242, 226, 196, 0.05);"
								onmouseenter={(e) => e.currentTarget.style.background = 'rgba(242, 226, 196, 0.15)'}
								onmouseleave={(e) => e.currentTarget.style.background = 'rgba(242, 226, 196, 0.05)'}
							>
								{secondaryCTAText}
							</a>
						{/if}
					</div>
				{/if}

				<!-- Search Box -->
				{#if showSearch}
					<div class="max-w-lg mx-auto lg:mx-0 animate-fade-in" style="animation-delay: 0.4s;">
						<SearchBox
							placeholder={searchPlaceholder}
							value={searchValue}
							onSearch={handleSearch}
							onInput={(value:any) => { searchValue = value; }}
							size="large"
							class="w-full"
						/>
					</div>
				{/if}
			</div>

			<!-- Right Column - Visual/Stats Card -->
			<div class="relative animate-slide-left">
				<!-- Decorative circles -->
				<div class="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse-slow" style="background: #FFD600;"></div>
				<div class="absolute -bottom-10 -left-10 w-72 h-72 rounded-full opacity-15 blur-3xl animate-pulse-slow" style="background: #E53935; animation-delay: 1.5s;"></div>
				
				<!-- Main Card -->
				<div class="relative backdrop-blur-xl rounded-3xl p-8 sm:p-10 border shadow-2xl" 
					style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.15) 0%, rgba(255, 214, 0, 0.1) 100%); border-color: rgba(242, 226, 196, 0.2);">
					
					<!-- Stats Grid -->
					<div class="grid grid-cols-3 gap-6 mb-8">
						<div class="text-center">
							<div class="text-3xl sm:text-4xl font-black mb-2" style="color: #FFD600;">1K+</div>
							<div class="text-xs sm:text-sm font-medium" style="color: rgba(242, 226, 196, 0.8);">Pelanggan Setia</div>
						</div>
						<div class="text-center border-x" style="border-color: rgba(242, 226, 196, 0.2);">
							<div class="text-3xl sm:text-4xl font-black mb-2" style="color: #FFD600;">15+</div>
							<div class="text-xs sm:text-sm font-medium" style="color: rgba(242, 226, 196, 0.8);">Varian Menu</div>
						</div>
						<div class="text-center">
							<div class="text-3xl sm:text-4xl font-black mb-2" style="color: #FFD600;">4.9★</div>
							<div class="text-xs sm:text-sm font-medium" style="color: rgba(242, 226, 196, 0.8);">Rating</div>
						</div>
					</div>

					<!-- Divider -->
					<div class="h-px mb-8" style="background: linear-gradient(to right, transparent, rgba(242, 226, 196, 0.3), transparent);"></div>

					<!-- Social Media Section -->
					<div class="space-y-6">
						<div class="text-center">
							<Typography variant="h5" class="font-bold mb-2 text-lg sm:text-xl" style="color: #F2E2C4;">
								Hubungi Kami
							</Typography>
							<Typography variant="body" class="text-sm" style="color: rgba(242, 226, 196, 0.7);">
								Follow & pesan langsung
							</Typography>
						</div>

						<div class="flex flex-wrap justify-center gap-3">
							<!-- Instagram -->
							<button 
								class="group relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-1 min-w-[120px] max-w-[160px]"
								style="background: linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%);"
								onclick={() => window.open('https://www.instagram.com/miniefood.indonesia/', '_blank')}
							>
								<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
								<img src="/Instagram_Glyph_White.png" alt="Instagram" class="w-6 h-6 relative z-10" />
								<span class="text-white text-sm font-bold relative z-10">Instagram</span>
							</button>

							<!-- TikTok -->
							<button 
								class="group relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex-1 min-w-[120px] max-w-[160px]"
								style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);"
								onclick={() => window.open('https://www.tiktok.com/@pempekminie', '_blank')}
							>
								<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
								<img src="/tiktok.png" alt="TikTok" class="w-6 h-6 relative z-10" />
								<span class="text-white text-sm font-bold relative z-10">TikTok</span>
							</button>
						</div>

						<!-- WhatsApp CTA - Featured -->
						<button 
							class="group relative overflow-hidden w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
							style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);"
							onclick={() => window.open('https://wa.me/6289501988111', '_blank')}
						>
							<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
							<div class="absolute -top-1 -right-1 flex h-3 w-3">
								<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
								<span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
							</div>
							<img src="/whatsapp.png" alt="WhatsApp" class="w-7 h-7 relative z-10 animate-pulse" />
							<span class="text-white text-base font-black relative z-10">PESAN VIA WHATSAPP</span>
						</button>
					</div>
				</div>
			</div>

		</div>
	</div>

	<!-- Floating Elements - dengan warna dari palette -->
	<div class="absolute top-1/4 left-[5%] w-32 h-32 rounded-full opacity-10 blur-2xl animate-float" style="background: #FFD600;"></div>
	<div class="absolute bottom-1/4 right-[5%] w-40 h-40 rounded-full opacity-10 blur-2xl animate-float" style="background: #E53935; animation-delay: 2s;"></div>
	<div class="absolute top-1/2 right-[15%] w-24 h-24 rounded-full opacity-5 blur-2xl animate-float" style="background: #F2E2C4; animation-delay: 3s;"></div>

	<!-- Scroll Indicator -->
	<!--  -->
</section>

<style>
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-left {
		from {
			opacity: 0;
			transform: translateX(40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes gradient {
		0%, 100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.3;
		}
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0px) translateX(0px);
		}
		25% {
			transform: translateY(-20px) translateX(10px);
		}
		50% {
			transform: translateY(-10px) translateX(-10px);
		}
		75% {
			transform: translateY(-30px) translateX(5px);
		}
	}

	@keyframes pulse-slow {
		0%, 100% {
			opacity: 0.15;
			transform: scale(1);
		}
		50% {
			opacity: 0.25;
			transform: scale(1.05);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.6s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.6s ease-out;
	}

	.animate-slide-left {
		animation: slide-left 0.8s ease-out;
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out;
	}

	.animate-gradient {
		animation: gradient 4s ease-in-out infinite;
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-pulse-slow {
		animation: pulse-slow 4s ease-in-out infinite;
	}

	.secondary-btn:hover {
		background: rgba(242, 226, 196, 0.15) !important;
	}
</style>
