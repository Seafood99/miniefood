<script lang="ts">
	import { getProducts } from '$lib/controllers/product.remote.js';
</script>

{#await getProducts()}
	<p>Loading products...</p>
{:then products}
	<ul>
		{#each products.data as product}
			<img src={(product.photos as unknown as { url: string })?.url || ''} alt="" />
			<li>{product.name} - ${product.price}</li>
		{:else}
			<p>No products available.</p>
		{/each}
	</ul>
{:catch error}
	<p class="text-red-500">Error loading products: {error.message}</p>
{/await}
