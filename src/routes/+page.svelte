<script lang="ts">
	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import Hero from '$lib/components/organisms/Hero.svelte';
	import ProductGrid from '$lib/components/organisms/ProductGrid.svelte';
	import ContactForm from '$lib/components/organisms/ContactForm.svelte';

	// Sample data for the homepage
	const heroData = {
		title: 'Nikmati Kelezatan Authentic Indonesian Food',
		subtitle: 'Rasakan cita rasa tradisional Indonesia dengan sentuhan modern yang menggugah selera',
		primaryCTAText: 'Lihat Produk',
		primaryCTAHref: '#products',
		secondaryCTAText: 'Pelajari Lebih Lanjut',
		secondaryCTAHref: '#about',
		showCTA: true,
		showSearch: false
	};

	const sampleProducts = [
		{
			id: 1,
			name: 'Pempek Original',
			description: 'Pempek ikan tenggiri asli dengan tekstur kenyal sempurna dan rasa ikan yang dominan. Disajikan dengan Cuko kental pedas manis gula aren yang otentik dan bikin nagih',
			price: 'Rp 85.000',
			originalPrice: 'Rp 95.000',
			image: '/src/lib/assets/2.png',
			category: 'Main Course',
			badge: 'Best Seller'
		},
		{
			id: 2,
			name: 'Pempek Mix',
			description: 'Paket komplit untuk pecinta variasi! Paduan nikmat dari Pempek Lenjer, Adaan, dan Kulit dalam satu piring. Nikmati sensasi beragam tekstur gurih yang berpadu harmonis dengan guyuran kuah Cuko segar',
			price: 'Rp 45.000',
			image: '/src/lib/assets/3.png',
			category: 'Traditional'
		},
		{
			id: 3,
			name: 'Super Tekwan',
			description: 'Semangkuk kehangatan dari kaldu udang asli yang gurih dan bening. Dilengkapi dengan bola ikan tenggiri yang lembut, irisan jamur kuping, soun, dan sedap malam. Cita rasa segar yang memanjakan lidah.',
			price: 'Rp 25.000',
			image: '/src/lib/assets/4.png',
			category: 'Condiment',
			badge: 'Spicy'
		},
		{
			id: 4,
			name: 'Pempek Crispy',
			description: 'Sensasi kriuk yang tak tertandingi! Pempek kulit yang digoreng kering hingga keemasan, menghasilkan tekstur super renyah namun tetap lembut di dalam. Camilan gurih yang pas untuk menemani waktu santai.',
			price: 'Rp 35.000',
			image: '/src/lib/assets/5.png',
			category: 'Grilled'
		},
		{
			id: 5,
			name: 'Pempek Keju',
			description: 'Kejutan rasa yang lumer di mulut! Perpaduan modern daging ikan tenggiri yang gurih dengan isian keju creamy yang meleleh saat digigit. Kombinasi rasa savory dan creamy yang mewah.',
			price: 'Rp 65.000',
			image: '/src/lib/assets/6.png',
			category: 'Rice Dish'
		},
		{
			id: 6,
			name: 'Otak-Otak goreng',
			description: 'Camilan praktis dengan aroma ikan yang kuat. Otak-otak goreng dengan tekstur kenyal dan padat, digoreng hingga kulit luarnya sedikit garing. Paling nikmat dicocol dengan saus cuko atau sambal merah.',
			price: 'Rp 35.000',
			image: '/src/lib/assets/7.png',
			category: 'Salad'
		},
		{
			id: 7,
			name: 'Pisang Crispy',
			description: 'Pisang pilihan yang manis alami, dibalut dengan tepung racikan khusus yang super renyah dan tahan lama. Ditambah topping melimpah (Cokelat/Keju) yang menyempurnakan rasa manis dan gurih di setiap gigitan.',
			price: 'Rp 30.000',
			image: '/src/lib/assets/8.png',
			category: 'Soup',
			badge: 'Popular'
		}
	];

	function handleContactSubmit(formData: any) {
		console.log('Contact form submitted:', formData);
		// Handle form submission
	}

	function handleProductClick(product: any) {
		console.log('Product clicked:', product);
		// Navigate to product detail
	}

	function handleHeroSearch(query: string) {
		console.log('Hero search:', query);
		// Handle search
	}
</script>

<svelte:head>
	<title>MiniEFood - Authentic Indonesian Cuisine</title>
	<meta name="description" content="Rasakan kelezatan makanan Indonesia autentik dengan MiniEFood. Produk berkualitas tinggi dengan cita rasa tradisional." />
</svelte:head>

<!-- Header -->
<Header />

<!-- Hero Section -->
<Hero 
	{...heroData}
	backgroundImage="/src/lib/assets/1.png"
	onSearch={handleHeroSearch}
/>

<!-- Products Section -->
<section id="products">
	<ProductGrid 
		title="Produk Unggulan Kami"
		description="Pilihan terbaik makanan Indonesia dengan kualitas premium dan cita rasa autentik"
		products={sampleProducts}
		onProductClick={handleProductClick}
		showViewAll={true}
		viewAllHref="/products"
	/>
</section>

<!-- Contact Section -->
<section id="contact">
	<ContactForm 
		onSubmit={handleContactSubmit}
	/>
</section>

<!-- Footer -->
<Footer />

