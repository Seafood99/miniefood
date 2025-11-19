<script lang="ts">
	import Typography from '../atoms/Typography.svelte';
	import FormGroup from '../molecules/FormGroup.svelte';

	let { 
		title = 'Hubungi Kami',
		subtitle = 'Sampaikan Pesan Anda',
		description = 'Kami siap membantu Anda dengan pertanyaan atau pesanan khusus',
		contactInfo = {
			address: 'Jl. Raya No. 123, Jakarta Selatan',
			phone: '+62 812-3456-7890',
			email: 'info@miniefood.com',
			hours: 'Senin - Sabtu: 08:00 - 20:00'
		},
		onSubmit,
		class: className = '',
		...restProps
	} = $props();

	const formFields = [
		{
			name: 'name',
			type: 'text',
			label: 'Nama Lengkap',
			placeholder: 'Masukkan nama lengkap Anda',
			required: true
		},
		{
			name: 'email',
			type: 'email',
			label: 'Email',
			placeholder: 'nama@email.com',
			required: true
		},
		{
			name: 'phone',
			type: 'tel',
			label: 'Nomor Telepon',
			placeholder: '+62 812-3456-7890',
			required: true
		},
		{
			name: 'subject',
			type: 'text',
			label: 'Subjek',
			placeholder: 'Tentang apa yang ingin Anda sampaikan?',
			required: true
		},
		{
			name: 'message',
			type: 'textarea',
			label: 'Pesan',
			placeholder: 'Tulis pesan Anda di sini...',
			required: true
		}
	];

	let loading = $state(false);

	function handleFormSubmit(formData: any) {
		loading = true;
		
		// Simulate API call
		setTimeout(() => {
			console.log('Contact form submitted:', formData);
			loading = false;
			
			if (onSubmit) {
				onSubmit(formData);
			}
		}, 2000);
	}

	const contactClasses = [
		'relative py-20 sm:py-24 lg:py-32 overflow-hidden',
		className
	].filter(Boolean).join(' ');
</script>

<section class={contactClasses} {...restProps}>
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
	<div class="absolute top-20 right-[10%] w-40 h-40 rounded-full opacity-10 blur-3xl animate-float" style="background: #FFD600;"></div>
	<div class="absolute bottom-32 left-[10%] w-56 h-56 rounded-full opacity-10 blur-3xl animate-float" style="background: #E53935; animation-delay: 2s;"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
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

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				<!-- Contact Information -->
				<div class="space-y-6 animate-slide-up" style="animation-delay: 0.2s;">
					<div class="mb-8">
						<Typography 
							tag="h3" 
							variant="h4" 
							class="font-bold mb-2"
							style="color: #F2E2C4;"
						>
							Informasi Kontak
						</Typography>
						<div class="h-1 w-16 rounded-full" style="background: linear-gradient(to right, #FFD600, #E53935);"></div>
					</div>

					<!-- Address -->
					<div class="group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
						style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" 
								style="background: linear-gradient(135deg, #FFD600 0%, #ffc400 100%);">
								<svg class="w-6 h-6" style="color: #2B1B17;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<Typography variant="h6" class="font-bold mb-2" style="color: #FFD600;">
									Alamat
								</Typography>
								<Typography variant="body" class="leading-relaxed" style="color: rgba(242, 226, 196, 0.8);">
									{contactInfo.address}
								</Typography>
							</div>
						</div>
					</div>

					<!-- Phone -->
					<div class="group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
						style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" 
								style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%);">
								<svg class="w-6 h-6" style="color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
								</svg>
							</div>
							<div class="flex-1">
								<Typography variant="h6" class="font-bold mb-2" style="color: #FFD600;">
									Telepon
								</Typography>
								<a href="tel:{contactInfo.phone}" class="group/link">
									<Typography variant="body" class="leading-relaxed group-hover/link:underline transition-all" style="color: rgba(242, 226, 196, 0.8);">
										{contactInfo.phone}
									</Typography>
								</a>
							</div>
						</div>
					</div>

					<!-- Email -->
					<div class="group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
						style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" 
								style="background: linear-gradient(135deg, #FFD600 0%, #ffc400 100%);">
								<svg class="w-6 h-6" style="color: #2B1B17;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div class="flex-1">
								<Typography variant="h6" class="font-bold mb-2" style="color: #FFD600;">
									Email
								</Typography>
								<a href="mailto:{contactInfo.email}" class="group/link">
									<Typography variant="body" class="leading-relaxed group-hover/link:underline transition-all" style="color: rgba(242, 226, 196, 0.8);">
										{contactInfo.email}
									</Typography>
								</a>
							</div>
						</div>
					</div>

					<!-- Hours -->
					<div class="group relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105"
						style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" 
								style="background: linear-gradient(135deg, #E53935 0%, #c62828 100%);">
								<svg class="w-6 h-6" style="color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<Typography variant="h6" class="font-bold mb-2" style="color: #FFD600;">
									Jam Operasional
								</Typography>
								<Typography variant="body" class="leading-relaxed" style="color: rgba(242, 226, 196, 0.8);">
									{contactInfo.hours}
								</Typography>
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div class="animate-slide-up" style="animation-delay: 0.4s;">
					<div class="relative backdrop-blur-xl rounded-2xl p-8 border"
						style="background: linear-gradient(135deg, rgba(242, 226, 196, 0.08) 0%, rgba(43, 27, 23, 0.95) 100%); border-color: rgba(242, 226, 196, 0.15);">
						
						<!-- Decorative Corner -->
						<div class="absolute top-0 right-0 w-32 h-32 opacity-20 overflow-hidden rounded-tr-2xl">
							<div class="absolute top-0 right-0 w-full h-full" 
								style="background: linear-gradient(135deg, transparent 50%, #FFD600 50%);"></div>
						</div>

						<div class="relative">
							<div class="mb-8">
								<Typography 
									tag="h3" 
									variant="h4" 
									class="font-bold mb-2"
									style="color: #F2E2C4;"
								>
									Kirim Pesan
								</Typography>
								<div class="h-1 w-16 rounded-full" style="background: linear-gradient(to right, #FFD600, #E53935);"></div>
							</div>

							<FormGroup
								fields={formFields}
								submitText="Kirim Pesan"
								submitVariant="primary"
								onSubmit={handleFormSubmit}
								{loading}
							/>
						</div>

						<!-- Bottom Accent -->
						<div class="absolute bottom-0 left-0 right-0 h-1 opacity-50 rounded-b-2xl" 
							style="background: linear-gradient(to right, transparent, #FFD600, #E53935, transparent);"></div>
					</div>
				</div>
			</div>
		</div>
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