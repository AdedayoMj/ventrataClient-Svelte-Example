import {writable} from 'svelte/store'
import  type {Writable} from 'svelte/store'
import type {Product} from '../types'
import type { Booking } from '../types';

// const url = `api/products.json`;
// const res = await fetch(url);
// console.log(res);
// const products = await res.json();
// let newProducts: Product[] = products.products;
const BookingStore:Writable<Booking[]> = writable([])

export default BookingStore