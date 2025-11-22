<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let sidebarOpen = $state(true);
	let activePage = $derived(page.url.pathname);

	const navigationItems = [
		{ href: '/products', label: 'Produk', icon: 'package' },
		{ href: '/categories', label: 'Kategori', icon: 'category' },
		{ href: '/traffic', label: 'Analytics', icon: 'traffic' },
		{ href: '/settings', label: 'Pengaturan', icon: 'settings' }
	];

	const secondaryItems = [
		{ href: '/help', label: 'Bantuan', icon: 'help' },
		{ href: '/logout', label: 'Keluar', icon: 'logout' }
	];

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<div class="flex h-screen bg-gray-50">
	<!-- Sidebar -->
	<aside
		class="z-20 bg-white shadow-xl transition-all duration-300 ease-in-out {sidebarOpen
			? 'w-64'
			: 'w-20'} flex flex-col"
	>
		<!-- Logo and Brand -->
		<div class="flex h-20 items-center justify-between border-b border-gray-200 px-4">
			{#if sidebarOpen}
				<div class="flex items-center gap-3">
					<Logo size="medium" />
					<div>
						<h1 class="text-xl font-bold text-gray-800">Minie Food</h1>
						<p class="text-xs text-gray-500">Admin Panel</p>
					</div>
				</div>
			{:else}
				<div class="flex w-full justify-center">
					<Logo size="medium" />
				</div>
			{/if}
		</div>

		<!-- Navigation -->
		<nav class="flex-1 overflow-y-auto py-4">
			<div class="space-y-1 px-2">
				{#each navigationItems as item}
					<a
						href={item.href}
						class="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 {activePage ===
						item.href
							? 'bg-red-50 font-medium text-red-600'
							: 'text-gray-600 hover:bg-gray-100'}"
					>
						<div class="shrink-0">
							{#if item.icon === 'package'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
									/>
								</svg>
							{:else if item.icon === 'category'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
									/>
								</svg>
							{:else if item.icon === 'traffic'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
							{:else if item.icon === 'settings'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							{/if}
						</div>
						{#if sidebarOpen}
							<span class="truncate">{item.label}</span>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Divider -->
			{#if sidebarOpen}
				<div class="my-4 px-4">
					<div class="border-t border-gray-200"></div>
				</div>
			{:else}
				<div class="my-4 px-2">
					<div class="mx-2 border-t border-gray-200"></div>
				</div>
			{/if}

			<!-- Secondary Navigation -->
			<div class="space-y-1 px-2">
				{#each secondaryItems as item}
					<a
						href={item.href}
						class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all duration-200 hover:bg-gray-100"
					>
						<div class="shrink-0">
							{#if item.icon === 'help'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							{:else if item.icon === 'logout'}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
							{/if}
						</div>
						{#if sidebarOpen}
							<span class="truncate">{item.label}</span>
						{/if}
					</a>
				{/each}
			</div>
		</nav>

		<!-- User Profile -->
		{#if sidebarOpen}
			<div class="border-t border-gray-200 p-4">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600"
					>
						A
					</div>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-gray-900">Admin User</p>
						<p class="truncate text-xs text-gray-500">admin@miniefood.com</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex justify-center border-t border-gray-200 p-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600"
				>
					A
				</div>
			</div>
		{/if}
	</aside>

	<!-- Main Content -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Top Bar -->
		<header class="z-10 border-b border-gray-200 bg-white">
			<div class="flex h-20 items-center justify-between px-6 py-4">
				<div class="flex items-center">
					<button
						onclick={toggleSidebar}
						class="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
						aria-label="Toggle sidebar"
					>
						{#if sidebarOpen}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
								/>
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 5l7 7-7 7M5 5l7 7-7 7"
								/>
							</svg>
						{/if}
					</button>
					<h2 class="text-xl font-semibold text-gray-800 capitalize">{activePage.split('/')[1]}</h2>
				</div>

				<div class="flex items-center gap-4">
					<!-- Search -->
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
							placeholder="Cari..."
							class="block w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
						/>
					</div>

					<!-- Notifications -->
					<button
						class="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						aria-label="Notification"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
						<span
							class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"
						></span>
					</button>

					<!-- User Menu -->
					<div class="flex items-center gap-2">
						<div class="hidden text-right md:block">
							<p class="text-sm font-medium text-gray-900">Admin User</p>
							<p class="text-xs text-gray-500">Administrator</p>
						</div>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-600"
						>
							A
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<main class="flex-1 overflow-y-auto bg-gray-50 p-6">
			{@render children()}
		</main>
	</div>
</div>
