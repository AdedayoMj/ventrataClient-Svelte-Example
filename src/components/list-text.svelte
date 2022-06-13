<script lang="ts">
	import type { Unit } from '../types';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	export let units: Unit[];
	export let defaultCurrency: string;
</script>

<LayoutGrid>
	{#each units as unit}
		<!-- svelte-ignore empty-block -->
		<Cell span={6}>
			<div class="list">
				{unit.name}: {#each unit.pricing as price}
					{#if price.currency === defaultCurrency}
						{price.price} {price.currency}
					{/if}
				{/each}
			</div>
		</Cell>
	{/each}
</LayoutGrid>

<style lang="css">
	.list {
		text-transform: capitalize;
		text-align: start;
	}
</style>
