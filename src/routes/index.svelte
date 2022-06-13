<script context="module" lang="ts">
	export async function load({ fetch }: { fetch: any }) {
		const url = `api/products.json`;
		const res = await fetch(url);
		console.log(res);
		const products = await res.json();
		let newProducts: Product[] = products.products;

		return { props: { products: newProducts } };
	}
</script>

<script lang="ts">
	import type { Product } from 'src/types';
	import Card from '../components/card.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { blur } from 'svelte/transition';

	export let products: Product[];

	export let productState: Product[] = products;
</script>

<main>
    <div class="category-name">Our Products</div>
		<br />
	<section transition:blur={{ delay: 300, duration: 800 }}>
		

		<!-- <div class="cards_align "> -->
		{#await productState then products}
			<LayoutGrid>
				{#each products as product, _i}
					<Cell span={4} order={10 - _i}>
						<Card {product} defaultCurrency={product.defaultCurrency} />
					</Cell>
				{/each}
			</LayoutGrid>
		{/await}
	</section>
</main>

<style lang="css">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.category-name {
		font-family: sans-serif;
		width: -webkit-fill-available;
		text-align: center;
		font-size: 40px;
	}
</style>
