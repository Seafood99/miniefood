<script lang="ts">
	import Typography from '../atoms/Typography.svelte';
	import Button from '../atoms/Button.svelte';

	let { 
		title,
		description,
		image,
		imageAlt = '',
		price,
		originalPrice,
		badge,
		buttonText = 'Lihat Detail',
		buttonHref,
		onButtonClick,
		children,
		class: className = '',
		...restProps
	} = $props();

	const cardClasses = [
		'group relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 ease-out',
		className
	].filter(Boolean).join(' ');
</script>

<div class={cardClasses} {...restProps}>
	<!-- Gradient Border Effect -->
	<div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
		style="background: linear-gradient(135deg, #FFD600 0%, #E53935 100%); padding: 2px;">
		<div class="w-full h-full rounded-2xl" style="background: #1a0f0d;"></div>
	</div>

	<!-- Card Content -->
	<div class="relative rounded-2xl border overflow-hidden" 
		style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
		
		{#if image}
			<div class="relative overflow-hidden h-56">
				<!-- Image Overlay Gradient -->
				<div class="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-transparent to-transparent opacity-60 z-10"></div>
				
				<img 
					src={image} 
					alt={imageAlt} 
					class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
				/>
				
				{#if badge}
					<div class="absolute top-4 left-4 z-20 px-4 py-2 rounded-full text-sm font-black backdrop-blur-md shadow-lg animate-badge-pulse"
						style="background: linear-gradient(135deg, {badge === 'Terlaris' ? '#E53935' : badge === 'Baru' ? '#FFD600' : '#E53935'} 0%, {badge === 'Terlaris' ? '#c62828' : badge === 'Baru' ? '#ffc400' : '#c62828'} 100%); color: {badge === 'Baru' ? '#2B1B17' : '#FFFFFF'}; box-shadow: 0 4px 20px rgba(229, 57, 53, 0.4);">
						{badge}
					</div>
				{/if}

				<!-- Decorative Corner -->
				<div class="absolute top-0 right-0 w-24 h-24 opacity-20">
					<div class="absolute top-0 right-0 w-full h-full" 
						style="background: linear-gradient(135deg, transparent 50%, #FFD600 50%);"></div>
				</div>
			</div>
		{/if}

		<div class="relative p-6 space-y-4">
			<!-- Decorative Line -->
			<div class="h-px w-16 mb-2" style="background: linear-gradient(to right, #FFD600, transparent);"></div>

			{#if title}
				<Typography 
					tag="h3" 
					variant="h4" 
					class="font-bold leading-tight group-hover:translate-x-1 transition-transform duration-300"
					style="color: #F2E2C4;"
				>
					{title}
				</Typography>
			{/if}

			{#if description}
				<Typography 
					variant="body" 
					class="leading-relaxed text-sm line-clamp-3"
					style="color: rgba(242, 226, 196, 0.7);"
				>
					{description}
				</Typography>
			{/if}

			{#if children}
				{@render children()}
			{/if}

			{#if price || originalPrice}
				<div class="flex items-baseline gap-3 pt-2">
					{#if price}
						<Typography 
							tag="span" 
							variant="h5" 
							class="font-black text-2xl"
							style="color: #FFD600;"
						>
							{price}
						</Typography>
					{/if}
					{#if originalPrice}
						<Typography 
							tag="span" 
							variant="caption" 
							class="line-through text-sm"
							style="color: rgba(242, 226, 196, 0.4);"
						>
							{originalPrice}
						</Typography>
					{/if}
					{#if originalPrice && price}
						<span class="text-xs font-bold px-2 py-1 rounded-md" 
							style="background: rgba(229, 57, 53, 0.2); color: #E53935;">
							HEMAT
						</span>
					{/if}
				</div>
			{/if}

			{#if buttonText && (buttonHref || onButtonClick)}
				<div class="pt-4">
					{#if buttonHref}
						<a href={buttonHref} class="block">
							<button 
								class="group/btn w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-2xl"
								style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF;"
							>
								{buttonText}
								<svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</button>
						</a>
					{:else}
						<button 
							onclick={onButtonClick}
							class="group/btn w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-2xl"
							style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%); color: #FFFFFF;"
						>
							{buttonText}
							<svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button>
					{/if}
				</div>
			{/if}

			<!-- Decorative Bottom Accent -->
			<div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
				style="background: linear-gradient(to right, transparent, #FFD600, #E53935, transparent);"></div>
		</div>
	</div>
</div>

<style>
	@keyframes badge-pulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.animate-badge-pulse {
		animation: badge-pulse 2s ease-in-out infinite;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>