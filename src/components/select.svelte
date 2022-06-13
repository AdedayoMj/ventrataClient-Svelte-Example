<script lang="ts">
import type { Product } from "src/types";


    export let label: string;
    export let selected:string
    export let product: Product;
    let type: string = "text"
    export let disabled: boolean = false
    export let valid: boolean = false
    let id = `field-${Math.floor(Math.random() * 1000)}`

  </script>
  
  <p class:valid>
    {#if label}
      <label for={id}>{label}</label>
    {/if}
    <select {disabled} {type} {id} bind:value={selected}>
        {#each product.options as options}
            <option  value={options.name}>{options.name}</option>
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
    .valid label {
      color: rgb(0, 180, 96);
    }
    select {
      border: 1px solid #dedede;
      border-radius: 0.25rem;
      padding: 0.8rem 1.2rem;
      font-size: 16px;
      display: block;
      width: 114%;
    }
    .valid select {
      border-color: rgb(0, 180, 96);
    }
  </style>