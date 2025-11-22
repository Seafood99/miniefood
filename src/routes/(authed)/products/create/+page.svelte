<script lang="ts">
	// Menggunakan Svelte 5 Runes untuk state
	let dragActive = $state(false);

	// Simulasi preview gambar (bisa dikembangkan nanti)
	let previewImages = $state<string[]>([]);

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragActive = false;
		// Logika handle file drop di sini
	}
</script>

<svelte:head>
	<title>Tambah Produk | Minie Food</title>
</svelte:head>

<!-- Page Container -->
<div class="">
	<!-- Page Header & Actions -->
	<!-- Sticky di top minus header layout height agar selalu terlihat saat scroll -->
	<div class="mb-5 border-b border-gray-200/50 bg-gray-50/95 pb-3 backdrop-blur transition-all">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-2xl font-bold tracking-tight text-gray-900">Tambah Produk Baru</h1>
				<p class="text-sm text-gray-500">Isi detail lengkap untuk menampilkan produk di katalog.</p>
			</div>
			<div class="flex items-center gap-3">
				<a
					href="/products"
					class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
				>
					Batal
				</a>
				<button
					type="submit"
					form="product-form"
					class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
						><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline
							points="17 21 17 13 7 13 7 21"
						/><polyline points="7 3 7 8 15 8" /></svg
					>
					Simpan Produk
				</button>
			</div>
		</div>
	</div>

	<!-- Form Layout -->
	<form id="product-form" class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Kolom Kiri: Konten Utama (2/3) -->
		<div class="space-y-6 lg:col-span-2">
			<!-- Card: Informasi Dasar -->
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-100 px-6 py-4">
					<h2 class="font-semibold text-gray-900">Informasi Dasar</h2>
				</div>
				<div class="space-y-5 p-6">
					<!-- Nama Produk -->
					<div>
						<label for="name" class="mb-1.5 block text-sm font-medium text-gray-700"
							>Nama Produk</label
						>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Contoh: Paket Nasi Ayam Bakar Madu"
							class="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-red-500 focus:bg-white focus:ring-red-500 sm:text-sm"
						/>
					</div>

					<!-- Deskripsi -->
					<div>
						<label for="description" class="mb-1.5 block text-sm font-medium text-gray-700"
							>Deskripsi</label
						>
						<div
							class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
						>
							<!-- Fake Toolbar -->
							<div class="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
								<button
									type="button"
									class="rounded p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
									aria-label="toolbar"
									><svg
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4" /></svg
									></button
								>
								<button
									type="button"
									class="rounded p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
									aria-label="toolbar"
									><svg
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16" /></svg
									></button
								>
								<button
									type="button"
									class="rounded p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
									aria-label="toolbar"
									><svg
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
											d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
										/></svg
									></button
								>
							</div>
							<textarea
								id="description"
								name="description"
								rows="6"
								class="block w-full border-0 p-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
								placeholder="Jelaskan rasa, tekstur, dan keunggulan produk ini..."
							></textarea>
						</div>
					</div>
				</div>
			</div>

			<!-- Card: Media Upload -->
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-100 px-6 py-4">
					<h2 class="font-semibold text-gray-900">Media Produk</h2>
				</div>
				<div class="p-6">
					<div
						role="button"
						tabindex="0"
						aria-label="Upload area"
						class="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200
						{dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}"
						ondragenter={() => (dragActive = true)}
						ondragleave={() => (dragActive = false)}
						ondrop={handleDrop}
						ondragover={(e) => e.preventDefault()}
					>
						<div class="flex flex-col items-center justify-center py-10 text-center">
							<div class="mb-3 rounded-full bg-white p-3 shadow-sm ring-1 ring-gray-200">
								<svg
									class="h-6 w-6 text-gray-400"
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
							<p class="text-sm font-medium text-gray-900">
								<span class="text-red-600">Klik untuk upload</span> atau drag and drop
							</p>
							<p class="mt-1 text-xs text-gray-500">PNG, JPG, GIF (Maks. 5MB)</p>
						</div>
						<input
							type="file"
							name="photos"
							multiple
							accept="image/*"
							class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Kolom Kanan: Sidebar Pengaturan (1/3) -->
		<div class="space-y-6">
			<!-- Card: Pengaturan -->
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-100 px-6 py-4">
					<h2 class="font-semibold text-gray-900">Pengaturan</h2>
				</div>
				<div class="space-y-4 p-6">
					<!-- Status -->
					<div>
						<label for="status" class="mb-1.5 block text-sm font-medium text-gray-700">Status</label
						>
						<select
							id="status"
							name="status"
							class="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-red-500 focus:bg-white focus:ring-red-500 sm:text-sm"
						>
							<option value="active">Aktif (Tampil)</option>
							<option value="draft">Draft (Disembunyikan)</option>
							<option value="soldout">Habis</option>
						</select>
					</div>

					<!-- Kategori -->
					<div>
						<label for="category" class="mb-1.5 block text-sm font-medium text-gray-700"
							>Kategori</label
						>
						<select
							id="category"
							name="category_id"
							class="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-red-500 focus:bg-white focus:ring-red-500 sm:text-sm"
						>
							<option value="">Pilih Kategori...</option>
							<option value="1">Makanan Berat</option>
							<option value="2">Minuman</option>
							<option value="3">Cemilan</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Card: Harga -->
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-100 px-6 py-4">
					<h2 class="font-semibold text-gray-900">Harga</h2>
				</div>
				<div class="space-y-4 p-6">
					<div>
						<label for="price" class="mb-1.5 block text-sm font-medium text-gray-700"
							>Harga Jual</label
						>
						<div class="relative rounded-md shadow-sm">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span class="text-gray-500 sm:text-sm">Rp</span>
							</div>
							<input
								type="text"
								name="price"
								id="price"
								class="block w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-gray-900 focus:border-red-500 focus:bg-white focus:ring-red-500 sm:text-sm"
								placeholder="0"
							/>
						</div>
					</div>

					<div>
						<label for="link" class="mb-1.5 flex justify-between text-sm font-medium text-gray-700">
							Link Eksternal
							<span class="text-xs font-normal text-gray-400">Opsional</span>
						</label>
						<div class="relative rounded-md shadow-sm">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									class="h-4 w-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									></path></svg
								>
							</div>
							<input
								type="url"
								name="link"
								id="link"
								class="block w-full rounded-lg border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 text-gray-900 focus:border-red-500 focus:bg-white focus:ring-red-500 sm:text-sm"
								placeholder="https://gofood.co.id/..."
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
