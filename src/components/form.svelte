<script lang="ts">
	import type { Booking, Contact, OptionList, Pricing, Product, Unit, UnitItem } from 'src/types';

	import UnitBox from './unit-box.svelte';
	import Select from './select.svelte';
	import SelectCurrency from './selectCurrecny.svelte';
	import Field from './field.svelte';
	import { blur } from 'svelte/transition';
	import BookingStore from '../store/store';
	import ModalSuccess from './modalSuccess.svelte';
    import Success from './success.svelte'
	import ConfirmBoooking from './confirm.svelte';

	export let product: Product;

	const defaultOptionSelect: OptionList[] = product.options.filter((e): any => {
		return e.default === true;
	});
	const [option] = defaultOptionSelect;

	let showModal = false;
	let toggleModal = () => {
		showModal = !showModal;
	};
    let toggleSuccess = () => {
		openSuccess = !openSuccess;
	};

	let optionName: string = option.name;
	let selectedCurrency: string;
	let fullName = '';
	let emailAddress = '';
	let phoneNumber = '';
	let unitItem: UnitItem[] = [];
	let pricingEvents: Pricing[];
    let openSuccess = false;
	let selectedByOptions: OptionList[] = [];
	let extratedUnits: Unit[];
	let checkBoxValid: boolean = false;
	let fullNameValid: boolean = false;
	let emailAddressValid: boolean = false;
	let phoneNumberValid: boolean = false;
	let submitting: boolean = false;
	let id = `field-${Math.floor(Math.random() * 1000)}`;
	let contact: Contact = {
		fullName: '',
		emailAddress: '',
		phoneNumber: ''
	};

	let booking: Booking = {
		id: id,
		productId: product.id,
		optionId: optionName,
		// pricing: pricingEvents&&pricingEvents,
		unitItems: unitItem,
		contact: contact
	};

	let valid = false;
	$: {
		valid = (fullNameValid || emailAddressValid || phoneNumberValid) && checkBoxValid;
	}
	function handleSubmit(e:any) {
        e.preventDefault();
		submitting = true;
		setTimeout(() => {
			submitting = false;
			toggleModal();
		}, 1000);
	}

	function handleChange(fullName: string, address: string, phone: string) {
		contact = {
			fullName: fullName,
			emailAddress: address,
			phoneNumber: phone
		};
	}
	function handleValidateFullName(val: string) {
		return val?.length > 3;
	}
	function handleValidateEmailAddress(val: string) {
		return val?.length > 3;
	}

	function handleValidatePhoneNumber(val: string) {
		return val?.length > 3;
	}

	$: {
		let select = product.options.filter((e): any => {
			return e.id === optionName;
		});

		selectedByOptions = select;
	}
	$: {
		handleChange(fullName, emailAddress, phoneNumber);
	}
  
    
</script>
<ModalSuccess {showModal} on:click={toggleModal}>
	<ConfirmBoooking toggleModal={toggleModal} toggleSuccess={toggleSuccess} {booking} />
</ModalSuccess>

   <Success {openSuccess}>
   <div class="success"> Successfull!!!
    How client will contact you. Thnaks for your patronage</div>
      <a href="/">OK</a>
    </Success>
   

 
<ModalSuccess {showModal} on:click={toggleModal}>
	<ConfirmBoooking toggleModal={toggleModal} toggleSuccess={toggleSuccess} {booking} />
</ModalSuccess>
<div class="card-display">
	<div class="category-name">{product.name}</div>
	<section transition:blur={{ delay: 300, duration: 800 }}>
		<form on:submit|preventDefault={handleSubmit}>
			<SelectCurrency
				label="Currency"
				disabled={submitting}
				currencies={product.availableCurrencies}
				defaultCurrency={product.defaultCurrency}
				bind:selected={selectedCurrency}
			/>

			<Select label="Tier Type" disabled={submitting} {product} bind:selected={optionName} />

			<UnitBox
				disabled={submitting}
				bind:valid={checkBoxValid}
				{selectedCurrency}
				{product}
				bind:extratedUnits
				{optionName}
				label="Number of people"
				bind:unitItem
				bind:pricing={pricingEvents}
			/>

			{#each selectedByOptions as options}
				{#each options.requiredContactFields as contacts, i}
					{#if contacts === 'fullName'}
						<Field
							label="Full Name"
							disabled={submitting}
							bind:value={fullName}
							bind:valid={fullNameValid}
							validate={handleValidateFullName}
						/>
					{:else if contacts === 'emailAddress'}
						<Field
							disabled={submitting}
							label="Email Address"
							bind:value={emailAddress}
							type="email"
							bind:valid={emailAddressValid}
							validate={handleValidateEmailAddress}
						/>
					{:else}
						<Field
							disabled={submitting}
							label="Phone Number"
							bind:value={phoneNumber}
							type="email"
							bind:valid={phoneNumberValid}
							validate={handleValidatePhoneNumber}
						/>
					{/if}
				{/each}
			{/each}
			<p><button type="submit" disabled={!valid || submitting}>Book</button></p>
		</form>
	</section>
	<form on:submit|preventDefault={handleSubmit} class="col" />
</div>

<style lang="postcss">
	section {
		margin: 0 auto;
		width: 300px;
	}
	form {
		margin: 80px 0 0 0;
	}
	button {
		margin-top: 1rem;
		background: rgb(0, 180, 96);
		color: white;
		border-radius: 0.25rem;
		border: 0 none;
		font-size: 18px;
		padding: 0.6rem 1.2rem;
	}
	button:disabled {
		background: #ddd;
	}
	.category-name {
		font-family: sans-serif;
		width: -webkit-fill-available;
		text-align: center;
		font-size: 30px;
		text-transform: capitalize;
		margin-bottom: 5px;
		margin-top: 40px;
	}
    .success{
        color: black;
    }
</style>
