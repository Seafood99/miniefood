<script lang="ts">
	import Typography from '../atoms/Typography.svelte';
	import Button from '../atoms/Button.svelte';
	import Card from '../molecules/Card.svelte';

	let { 
		title = 'Produk Terlaris Kami',
		subtitle = 'Cita Rasa Autentik Indonesia',
		description = 'Pilihan produk berkualitas tinggi yang paling disukai pelanggan',
		products = [
			{
				id: 1,
				title: 'Rendang Daging Sapi Premium',
				description: 'Rendang autentik dengan bumbu rempah pilihan, daging sapi premium yang empuk dan lezat.',
				price: 'Rp 85.000',
				originalPrice: 'Rp 95.000',
				image: '/products/rendang.jpg',
				badge: 'Terlaris',
				buttonText: 'Pesan Sekarang'
			},
			{
				id: 2,
				title: 'Gudeg Yogya Asli',
				description: 'Gudeg tradisional Yogyakarta dengan cita rasa manis yang khas dan aroma santan yang menggoda.',
				price: 'Rp 65.000',
				image: '/products/gudeg.jpg',
				buttonText: 'Pesan Sekarang'
			},
			{
				id: 3,
				title: 'Sate Ayam Bumbu Kacang',
				description: 'Sate ayam dengan bumbu kacang yang creamy dan daging ayam yang tender.',
				price: 'Rp 55.000',
				image: '/products/sate.jpg',
				badge: 'Baru',
				buttonText: 'Pesan Sekarang'
			}
		],
		showViewAll = true,
		viewAllText = 'Lihat Semua Produk',
		viewAllHref = '/produk',
		columns = 3,
		onProductClick,
		class: className = '',
		...restProps
	} = $props();

	const gridClasses = [
		'relative py-20 sm:py-24 lg:py-32 overflow-hidden',
		className
	].filter(Boolean).join(' ');

	const productGridClasses = [
		'grid gap-8',
		columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 
		columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
		columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
		'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
	].join(' ');

	function handleProductClick(product: any) {
		if (onProductClick) {
			onProductClick(product);
		}
	}
</script>

<section class={gridClasses} {...restProps}>
	<!-- Background dengan tema serupa Hero -->
	<div class="absolute inset-0" style="background: linear-gradient(180deg, #2B1B17 0%, #3d2b26 50%, #2B1B17 100%);"></div>
	
	<!-- Animated Overlay -->
	<div class="absolute inset-0 opacity-15">
		<div class="absolute inset-0 bg-gradient-to-br from-[#FFD600]/20 via-transparent to-[#E53935]/20 animate-gradient"></div>
	</div>
	
	<!-- Decorative Pattern -->
	<div class="absolute inset-0 opacity-[0.02]">
		<div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
	</div>

	<!-- Floating Elements -->
	<div class="absolute top-10 left-[10%] w-40 h-40 rounded-full opacity-10 blur-3xl animate-float" style="background: #FFD600;"></div>
	<div class="absolute bottom-20 right-[10%] w-56 h-56 rounded-full opacity-10 blur-3xl animate-float" style="background: #E53935; animation-delay: 2s;"></div>
	<div class="absolute top-1/3 right-[20%] w-32 h-32 rounded-full opacity-5 blur-3xl animate-float" style="background: #F2E2C4; animation-delay: 3s;"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Header dengan animasi -->
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<!-- Decorative Line -->
			<div class="flex items-center justify-center gap-4 mb-6 animate-fade-in">
				<div class="h-px w-16 sm:w-24" style="background: linear-gradient(to right, transparent, #FFD600);"></div>
				<div class="w-2 h-2 rounded-full" style="background: #FFD600;"></div>
				<div class="h-px w-16 sm:w-24" style="background: linear-gradient(to left, transparent, #FFD600);"></div>
			</div>

			<Typography 
				tag="h2" 
				variant="h2" 
				class="font-black leading-tight tracking-tight mb-4 animate-slide-up"
				style="color: #F2E2C4; font-size: clamp(2rem, 4vw, 3.5rem); text-shadow: 0 2px 20px rgba(229, 57, 53, 0.3);"
			>
				{title}
			</Typography>
			
			{#if subtitle}
				<Typography 
					tag="h3"
					variant="h4" 
					class="text-xl sm:text-2xl font-semibold mb-6 animate-slide-up"
					style="color: #FFD600; animation-delay: 0.1s;"
				>
					{subtitle}
				</Typography>
			{/if}
			
			{#if description}
				<Typography 
					variant="lead" 
					class="text-base sm:text-lg leading-relaxed animate-fade-in"
					style="color: rgba(242, 226, 196, 0.8); animation-delay: 0.2s;"
				>
					{description}
				</Typography>
			{/if}

			<!-- Decorative Line Bottom -->
			<div class="flex items-center justify-center gap-4 mt-8 animate-fade-in" style="animation-delay: 0.3s;">
				<div class="h-px w-20 sm:w-32" style="background: linear-gradient(to right, transparent, rgba(242, 226, 196, 0.3), transparent);"></div>
			</div>
		</div>

		<!-- Products Grid dengan animasi stagger -->
		<div class={productGridClasses}>
			{#each products as product, index (product.id)}
				<div 
					class="animate-slide-up"
					style="animation-delay: {0.1 * index}s;"
				>
					<Card
						title={product.title}
						description={product.description}
						image={product.image}
						imageAlt={product.title}
						price={product.price}
						originalPrice={product.originalPrice}
						badge={product.badge}
						buttonText={product.buttonText}
						buttonHref={undefined}
						onButtonClick={() => handleProductClick(product)}
						class="h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
					>
						{#snippet children()}{/snippet}
					</Card>
				</div>
			{/each}
		</div>

		<!-- View All Button dengan styling konsisten dengan Hero -->
		{#if showViewAll}
			<div class="text-center mt-16 animate-fade-in" style="animation-delay: 0.5s;">
				<a 
					href={viewAllHref}
					class="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[250px]"
					style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF; box-shadow: 0 10px 40px rgba(229, 57, 53, 0.4);"
				>
					{viewAllText}
					<svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
				
				<!-- Additional CTA Info -->
				<div class="mt-6 flex items-center justify-center gap-2">
					<div class="flex -space-x-2">
						<div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" 
							style="background: linear-gradient(135deg, #FFD600 0%, #ffc400 100%); border-color: #2B1B17; color: #2B1B17;">
							1K+
						</div>
						<div class="w-8 h-8 rounded-full border-2 flex items-center justify-center" 
							style="background: rgba(242, 226, 196, 0.9); border-color: #2B1B17;">
							<span style="color: #2B1B17;">😋</span>
						</div>
						<div class="w-8 h-8 rounded-full border-2 flex items-center justify-center" 
							style="background: rgba(229, 57, 53, 0.9); border-color: #2B1B17;">
							<span style="color: #FFFFFF;">⭐</span>
						</div>
					</div>
					<Typography variant="small" class="font-medium" style="color: rgba(242, 226, 196, 0.7);">
						Dipercaya oleh 1000+ pelanggan setia
					</Typography>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
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
			opacity: 0.15;
		}
		50% {
			opacity: 0.25;
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

	.animate-slide-up {
		animation: slide-up 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out forwards;
		opacity: 0;
	}

	.animate-gradient {
		animation: gradient 4s ease-in-out infinite;
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>