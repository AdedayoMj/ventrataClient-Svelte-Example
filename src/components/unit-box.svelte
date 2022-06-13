<script lang="ts">
	import { tick } from 'svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import type { OptionList, Pricing, Product, Unit, UnitCheck, UnitID, UnitItem } from 'src/types';
	import { convertNumberToDecimal } from '../lib/convertion';

	export let product: Product;
	export let valid: boolean = false;
	export let label: string;
	export let selectedCurrency: string;
	export let optionName: string;
	export let disabled: boolean = false;
	export let unitItem: UnitItem[] = [];
	export let pricing: Pricing[] = [];

	let selectedByOptions: OptionList[] = [];

	export let extratedUnits: Unit[];
	let visible: boolean = false;
	let id = `field-${Math.floor(Math.random() * 1000)}`;

	const handleInput = async (currency: any) => {
		await tick();
		const listed: Unit[] = selectedByOptions[0].units.map((element, index) => {
			return {
				...element,
				pricing: element.pricing.filter((subElement) => subElement.currency === currency)
			};
		});

		return (extratedUnits = listed as Unit[]);
	};

	const handleInputIndex = (e: any) => {
		let name = e.target.name;
		let quantity = e.target.value;

		let index = unitItem.findIndex((unit) => unit.unitId === name);
		let extractPrice = extratedUnits.find((price) => price.name === name);
		const eachPrice = extractPrice ? extractPrice.pricing[0].price : 0;
		let price = Number(convertNumberToDecimal(eachPrice));
		const newObject: UnitItem = {
			unitId: name,
			quantity: quantity,
			price: price
		};

		if (index === -1) {
			unitItem.push(newObject);
			if (extractPrice) pricing.push(extractPrice.pricing[0]);
		} else {
			unitItem[index] = {
				unitId: name,
				quantity: quantity,
				price: price
			};
		}
	};

	$: {
		const check = unitItem?.map((re) => {
			return re.quantity > 0;
		});

		if (check.includes(true)) {
			valid = true;
		} else {
			valid = false;
		}
	}

	$: {
		let select = product.options.filter((e): any => {
			return e.id === optionName;
		});

		selectedByOptions = select;

		handleInput(selectedCurrency);
	}
</script>

<div class:valid>
	{#if label}
		<div class="label-text1">
			<LayoutGrid>
				<Cell span={7}>
					<label class="label-text1" for="header">
						{label}
					</label>
				</Cell>
				<Cell span={2}>
					<input type="checkbox" bind:checked={visible} />
				</Cell>
				<Cell span={2}>
					<label class="label-text1" for="header"
						>{#if valid}<span>✔</span>{/if}</label
					>
				</Cell>
			</LayoutGrid>
		</div>
	{/if}
	{#if visible}
		<div>
			{#if extratedUnits}
				{#each extratedUnits as units, i}
					<div class="form-check">
						<label for={id} class="label-text">
							<LayoutGrid>
								<Cell span={3}>
									<div>{units.name}</div>
								</Cell>
								<Cell span={5}
									><div>Price: {convertNumberToDecimal(units.pricing[0].price)}</div>
								</Cell>

								<Cell span={12}>
									<input
										{disabled}
										type="number"
										on:input={handleInputIndex}
										name={units.unitID}
										min="0"
										value="0"
									/>
								</Cell>
							</LayoutGrid>
						</label>
					</div>
					<div />
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.label-text {
		font-size: 15px;
		font-family: sans-serif;
		font-weight: bold;
		display: block;
		line-height: 1.2;
		margin: 0.5rem 0;
		text-transform: capitalize;
	}
	.label-text1 span {
		margin-left: 0.5rem;
		/* margin-right: 1rem; */
	}
	.label-text1 {
		font-size: 15px;
		font-family: sans-serif;
		font-weight: bold;
		display: block;
		line-height: 1.2;
		/* margin: 0.5rem 0; */
		margin-left: -0.8rem;
		text-transform: capitalize;
	}
	input {
		border: 1px solid #dedede;
		border-radius: 0.25rem;
		padding: 0.2rem 1.2rem;
		font-size: 16px;
		width: 50%;
	}
	/* button {
		padding: 0.2rem 0.7rem;
	} */
	.valid .label-text1 {
		color: rgb(0, 180, 96);
	}
	div {
		color: white !important;
		text-align: start;
	}
</style>
