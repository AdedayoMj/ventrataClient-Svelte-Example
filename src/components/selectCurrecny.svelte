<script lang="ts">
	export let label: string;
	export let defaultCurrency: string;
	export let currencies: string[];
	export let type: string = 'text';
	export let selected: string = defaultCurrency;
	export let disabled: boolean = false;
	let id = `field-${Math.floor(Math.random() * 1000)}`;
</script>

<p>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {disabled} {type} {id} bind:value={selected}>
		{#each currencies as currency}
			<option value={currency}>{currency}</option>
		{/each}
	</select>
</p>

<style lang="postcss">
	label {
		font-size: 15px;
		font-family: sans-serif;
		font-weight: bold;
		display: block;
		line-height: 1.2;
		margin: 0.5rem 0;
	}

	select {
		border: 1px solid #dedede;
		border-radius: 0.25rem;
		padding: 0.8rem 1.2rem;
		font-size: 16px;
		display: block;
		width: auto;
	}
</style>
