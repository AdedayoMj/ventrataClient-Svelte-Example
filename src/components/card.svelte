<script lang="ts">
	import type { Product } from '../types';
	import ListCard from './list-text.svelte';
	import Button, { Label } from '@smui/button';
	import Card, { Content,Actions } from '@smui/card';

	export let defaultCurrency: string;
	export let product: Product;
</script>

{#each product.options as option}
	{#if option.default === true}
		<div class="card-display">
			<div class="card-container">
				<Card>
					<div style="padding: 1rem;">
						<h2 class="mdc-typography--headline6 card-title" style="margin: 0;">
							{product.name}
						</h2>
						<h3
							class="mdc-typography--subtitle2 card-subtitle"
							style="margin-Top: 0.3rem; ; color: #888;"
						>
							{option.name}
						</h3>
					</div>
					<Content><ListCard units={option.units} {defaultCurrency} /></Content>
					<Actions fullBleed>
						<Button>
							<Label><a href={`/${product.id}`}>Read More</a></Label>
							<i href={`/${product.id}`} class="material-icons" aria-hidden="true">arrow_forward</i>
						</Button>
					</Actions>
				</Card>
			</div>
		</div>
	{/if}
{/each}

<style>
	a:link,
	a:visited,
	a:hover,
	a:active {
		color: #04495c;
		text-decoration: none;
	}
	.card-title {
		font-size: 25px;
		font-family: 'Open Sans', sans-serif;
		text-transform: capitalize;
		text-align: center;
	}
	.card-subtitle {
		font-family: 'Open Sans', sans-serif;
		text-align: center;
	}
</style>
