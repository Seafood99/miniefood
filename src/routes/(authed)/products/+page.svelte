<script lang="ts">
	import { resolve } from '$app/paths';
	import { getProducts } from '$lib/controllers/product.remote.js';
	import { onMount } from 'svelte';

	// State management
	let searchTerm = $state('');
	let selectedCategory = $state('all');
	let selectedStatus = $state('all');
	let viewMode = $state('grid');
	let sortBy = $state('name');
	let products = $derived(await getProducts());
	let filteredProducts: typeof products = $state([]);
	let isLoading = $state(true);
	let selectedProducts = $state(new Set());

	// Statistics
	let stats = $state({
		total: 0,
		active: 0,
		draft: 0,
		outOfStock: 0
	});

	// Filter products
	$effect(() => {
		if (products.length === 0) return;

		let filtered = products;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Category filter
		if (selectedCategory !== 'all') {
			filtered = filtered.filter((product) => product.category_id.toString() === selectedCategory);
		}

		// Status filter
		if (selectedStatus !== 'all') {
			filtered = filtered.filter((product) => product.status === selectedStatus);
		}

		// Sort
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'created':
					return new Date(b.created_at).getDate() - new Date(a.created_at).getDate();
				default:
					return 0;
			}
		});

		filteredProducts = filtered;
	});

	onMount(async () => {
		try {
			// Calculate statistics
			stats = {
				total: products.length,
				active: products.filter((p) => p.status === 'active').length,
				draft: products.filter((p) => p.status === 'draft').length,
				outOfStock: products.filter((p) => p.status === 'soldout').length
			};
		} catch (error) {
			console.error('Failed to load products:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<!-- Page Header with Statistics -->
<div class="mb-8">
	<div class="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">Manajemen Produk</h1>
			<p class="mt-2 text-sm text-gray-600">Kelola dan pantau katalog produk Anda dengan mudah</p>
		</div>
		<a
			href="/products/create"
			class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 5v14M5 12h14" />
			</svg>
			Tambah Produk Baru
		</a>
	</div>

	<!-- Statistics Cards -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Total Produk</p>
					<p class="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p>
				</div>
				<div class="rounded-lg bg-blue-50 p-3">
					<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
						/>
					</svg>
				</div>
			</div>
		</div>

		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Aktif</p>
					<p class="mt-1 text-2xl font-bold text-green-600">{stats.active}</p>
				</div>
				<div class="rounded-lg bg-green-50 p-3">
					<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			</div>
		</div>

		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Draft</p>
					<p class="mt-1 text-2xl font-bold text-yellow-600">{stats.draft}</p>
				</div>
				<div class="rounded-lg bg-yellow-50 p-3">
					<svg
						class="h-6 w-6 text-yellow-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</div>
			</div>
		</div>

		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Habis</p>
					<p class="mt-1 text-2xl font-bold text-red-600">{stats.outOfStock}</p>
				</div>
				<div class="rounded-lg bg-red-50 p-3">
					<svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Advanced Toolbar -->
<div class="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-100 p-4">
		<div class="flex flex-col gap-4 lg:flex-row">
			<!-- Search Bar -->
			<div class="flex-1">
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="text"
						bind:value={searchTerm}
						placeholder="Cari produk berdasarkan nama atau deskripsi..."
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pr-3 pl-10 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 sm:text-sm"
					/>
				</div>
			</div>

			<!-- Filter Controls -->
			<div class="flex flex-wrap gap-3">
				<!-- Category Filter -->
				<select
					bind:value={selectedCategory}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Kategori</option>
					<option value="1">Makanan Berat</option>
					<option value="2">Minuman</option>
					<option value="3">Cemilan</option>
				</select>

				<!-- Status Filter -->
				<select
					bind:value={selectedStatus}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Status</option>
					<option value="active">Aktif</option>
					<option value="draft">Draft</option>
					<option value="soldout">Habis</option>
				</select>

				<!-- Sort Options -->
				<select
					bind:value={sortBy}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
				>
					<option value="name">Nama (A-Z)</option>
					<option value="price-low">Harga (Rendah-Tinggi)</option>
					<option value="price-high">Harga (Tinggi-Rendah)</option>
					<option value="created">Terbaru</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Bulk Actions Bar -->
	<div class="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
		<div class="flex items-center gap-4">
			<label class="flex items-center gap-2 text-sm text-gray-700">
				<input
					type="checkbox"
					onchange={(e) => {
						if (e.target.checked) {
							selectedProducts = new Set(filteredProducts.map((p) => p.id));
						} else {
							selectedProducts = new Set();
						}
					}}
					class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
				/>
				Pilih Semua
			</label>

			{#if selectedProducts.size > 0}
				<div class="flex items-center gap-2">
					<span class="text-sm text-gray-600">{selectedProducts.size} dipilih</span>
					<div class="flex gap-2">
						<button
							class="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
						>
							Hapus
						</button>
						<button
							class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
						>
							Ekspor
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- View Mode Toggle -->
		<div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
			<button
				class="rounded-md p-2 transition-colors {viewMode === 'grid'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-600 hover:text-gray-900'}"
				onclick={() => (viewMode = 'grid')}
				title="Grid View"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
			</button>
			<button
				class="rounded-md p-2 transition-colors {viewMode === 'list'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-600 hover:text-gray-900'}"
				onclick={() => (viewMode = 'list')}
				title="List View"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 10h16M4 14h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>

<!-- Results Summary -->
<div class="mb-6 flex items-center justify-between">
	<div class="text-sm text-gray-600">
		Menampilkan <span class="font-medium text-gray-900">{filteredProducts.length}</span> dari{' '}
		<span class="font-medium text-gray-900">{products.length}</span> produk
	</div>
	<div class="text-sm text-gray-500">
		{filteredProducts.length === 0 ? 'Tidak ada produk yang cocok' : ''}
	</div>
</div>
<div>
	{#if isLoading}
		<!-- Professional Loading State -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each Array(8) as _}
				<div class="animate-pulse">
					<div class="h-48 rounded-t-xl bg-gray-200"></div>
					<div class="rounded-b-xl border-x border-b border-gray-200 bg-white p-4">
						<div class="mb-2 h-4 rounded bg-gray-200"></div>
						<div class="mb-3 h-3 w-3/4 rounded bg-gray-200"></div>
						<div class="mb-3 h-6 w-1/2 rounded bg-gray-200"></div>
						<div class="flex gap-2">
							<div class="h-8 flex-1 rounded bg-gray-200"></div>
							<div class="h-8 flex-1 rounded bg-gray-200"></div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else if filteredProducts.length === 0}
		<!-- Professional Empty State -->
		<div class="py-16 text-center">
			<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Tidak ada produk ditemukan</h3>
			<p class="mx-auto mb-6 max-w-sm text-gray-500">
				{searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
					? 'Coba ubah filter atau kata kunci pencarian Anda.'
					: 'Mulai dengan menambahkan produk pertama Anda.'}
			</p>
			{#if !searchTerm && selectedCategory === 'all' && selectedStatus === 'all'}
				<a
					href="/products/create"
					class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 5v14M5 12h14" />
					</svg>
					Tambah Produk Pertama
				</a>
			{/if}
		</div>
	{:else}
		<!-- Enhanced Product Grid -->
		<div
			class="grid grid-cols-1 gap-6 {viewMode === 'grid'
				? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				: ''}"
		>
			{#each filteredProducts as product (product.id)}
				<div
					class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl {viewMode ===
					'list'
						? 'flex'
						: ''}"
				>
					<!-- Selection Checkbox -->
					<div
						class="absolute top-3 left-3 z-10 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<input
							type="checkbox"
							onchange={(e) => {
								if (e.target.checked) {
									selectedProducts.add(product.id);
								} else {
									selectedProducts.delete(product.id);
								}
								selectedProducts = new Set(selectedProducts);
							}}
							class="rounded border-gray-300 bg-white/90 text-blue-600 backdrop-blur-sm focus:ring-blue-500"
						/>
					</div>

					<!-- Status Badge -->
					<div class="absolute top-3 right-3 z-10">
						{#if product.status === 'active'}
							<span
								class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 backdrop-blur-sm"
							>
								Aktif
							</span>
						{:else if product.status === 'draft'}
							<span
								class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 backdrop-blur-sm"
							>
								Draft
							</span>
						{:else if product.status === 'soldout'}
							<span
								class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 backdrop-blur-sm"
							>
								Habis
							</span>
						{/if}
					</div>

					<!-- Product Image -->
					<div
						class="{viewMode === 'grid'
							? 'aspect-w-16 aspect-h-12'
							: 'h-32 w-48 shrink-0'} relative overflow-hidden bg-gray-100"
					>
						{#if (product.photos as unknown as { url: string })?.url}
							<img
								src={(product.photos as unknown as { url: string }).url}
								alt={product.name}
								class="{viewMode === 'grid'
									? 'h-48 w-full'
									: 'h-full w-full'} object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						{:else}
							<div
								class="flex items-center justify-center {viewMode === 'grid'
									? 'h-48'
									: 'h-full'} bg-gray-100"
							>
								<svg
									class="h-12 w-12 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
						{/if}

						<!-- Image Overlay Actions -->
						<div
							class="bg-opacity-0 group-hover:bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100"
						>
							<div
								class="flex translate-y-2 transform gap-2 transition-transform duration-300 group-hover:translate-y-0"
							>
								<a
									href={resolve('/(authed)/products/[slug]', {
										slug: product.slug
									})}
									class="rounded-lg bg-white p-2 shadow-lg transition-colors hover:bg-gray-50"
									title="Lihat Detail"
								>
									<svg
										class="h-4 w-4 text-gray-700"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								</a>
								<a
									href={resolve('/(authed)/products/[slug]', {
										slug: product.slug
									})}
									class="rounded-lg bg-white p-2 shadow-lg transition-colors hover:bg-gray-50"
									title="Edit Produk"
								>
									<svg
										class="h-4 w-4 text-gray-700"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>

					<!-- Product Info -->
					<div class="p-4 {viewMode === 'list' ? 'flex-1' : ''}">
						<div class={viewMode === 'list' ? 'flex items-start justify-between' : ''}>
							<div class={viewMode === 'list' ? 'min-w-0 flex-1' : ''}>
								<!-- Product Name -->
								<h3
									class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 {viewMode === 'list'
										? 'text-base'
										: ''}"
								>
									{product.name}
								</h3>

								<!-- Product Description -->
								<p
									class="mb-3 line-clamp-2 text-sm text-gray-600 {viewMode === 'list'
										? 'hidden sm:block'
										: ''}"
								>
									{product.description}
								</p>

								<!-- Product Meta -->
								<div class="mb-3 flex items-center gap-3 text-xs text-gray-500">
									{#if product.category_id === 1}
										<span
											class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-blue-700"
										>
											Makanan Berat
										</span>
									{:else if product.category_id === 2}
										<span
											class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-green-700"
										>
											Minuman
										</span>
									{:else if product.category_id === 3}
										<span
											class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-purple-700"
										>
											Cemilan
										</span>
									{/if}
								</div>
							</div>

							{#if viewMode === 'list'}
								<!-- Price and Actions in List View -->
								<div class="ml-4 flex flex-col items-end">
									<div class="mb-2 text-xl font-bold text-gray-900">
										Rp{product.price.toLocaleString('id-ID')}
									</div>
									<div class="flex gap-2">
										<a
											href={resolve('/(authed)/products/[slug]', {
												slug: product.slug
											})}
											class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
											title="Edit"
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
												/>
											</svg>
										</a>
										{#if product.link}
											<a
												href={product.link}
												target="_blank"
												rel="noopener noreferrer"
												class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
												title="Link Eksternal"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
											</a>
										{/if}
									</div>
								</div>
							{/if}
						</div>

						{#if viewMode === 'grid'}
							<!-- Price and Actions in Grid View -->
							<div class="flex items-center justify-between border-t border-gray-100 pt-3">
								<div>
									<div class="text-xl font-bold text-gray-900">
										Rp{product.price.toLocaleString('id-ID')}
									</div>
								</div>
								<div class="flex gap-1">
									<a
										href={resolve('/(authed)/products/[slug]', {
											slug: product.slug
										})}
										class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
										title="Edit"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</a>
									{#if product.link}
										<a
											href={product.link}
											target="_blank"
											rel="noopener noreferrer"
											class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
											title="Link Eksternal"
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
												/>
											</svg>
										</a>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Professional Error Handling -->
	<!-- {#if true}
		<div class="flex flex-col items-center justify-center py-16">
			<div class="mb-4 rounded-full bg-red-100 p-4">
				<svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">Terjadi Kesalahan</h3>
			<p class="mb-6 max-w-md text-center text-sm text-gray-500">
				{'Gagal memuat data produk. Silakan coba lagi nanti.'}
			</p>
			<button
				onclick={() => window.location.reload()}
				class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				Refresh Halaman
			</button>
		</div>
	{/if} -->
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.aspect-w-16 {
		position: relative;
	}

	.aspect-w-16::before {
		content: '';
		display: block;
		padding-bottom: 75%; /* 4:3 aspect ratio */
	}

	.aspect-w-16 > * {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	/* Professional loading animation */
	@keyframes shimmer {
		0% {
			background-position: -200px 0;
		}
		100% {
			background-position: calc(200px + 100%) 0;
		}
	}

	.animate-pulse > div {
		background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
		background-size: 200px 100%;
		animation: shimmer 1.5s infinite;
	}
</style>
