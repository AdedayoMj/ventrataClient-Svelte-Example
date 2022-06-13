<script context="module" lang="ts">
	import type { Product } from '../types';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	export const load = async ({ params, fetch }: { params: any; fetch: any }) => {
		const id = params.id as string;
		const urlPassed = `api/products/${id}.json`;

		const res = await fetch(urlPassed);

		const product = await res.json();
		const newProduct: Product = product.product;

		return {
			props: {
				product: newProduct
			}
		};
	};
</script>

<script lang="ts">
	import Form from '../components/form.svelte';

	export let product: Product;
</script>

	<Form {product} />

