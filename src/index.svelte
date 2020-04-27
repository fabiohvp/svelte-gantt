<script context="module">
  import "./tailwind.css";
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import dateUtils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import Item from "./Item.svelte";

  export let endDate;
  export let formatSlice = (c, s) => slice;
  export let header;
  export let rows;
  export let slices;
  export let slicesSize;
  export let startDate;

  const dispatch = createEventDispatcher();
  let container;
  let items;

  $: timezone = new Date(startDate).getTimezoneOffset() * 60 * 1000; //milliseconds
  $: slices = getSlices(startDate, endDate, slicesSize);
  $: (items = {}), slicesSize;

  function getSlices(startDate, endDate, slicesSize) {
    const _slices = [];
    let date = startDate;

    while (date <= endDate) {
      _slices.push(
        formatSlice({
          startDate: date,
          endDate: date + slicesSize - 1
        })
      );
      date += slicesSize;
    }
    return _slices;
  }

  function itemOnClick(e) {
    dispatch("click.item", e.detail);
  }

  function rowOnClick(e) {
    dispatch("click.row", e.detail);
  }
</script>

<style>
  .svelte-gantt {
    position: relative;
  }

  .svelte-gantt table {
    border: 1px solid black;
    color: #707070;
  }

  .svelte-gantt thead {
    background-color: #f9fafb;
  }
</style>

<div bind:this={container} class="svelte-gantt">
  <table>
    <thead>
      <Header {slices} {header} {slicesSize} />
    </thead>
    <tbody>
      {#each rows as row, index (row)}
        <Row
          {index}
          bind:items
          bind:row
          {slices}
          {slicesSize}
          {timezone}
          on:click={rowOnClick} />
      {/each}
    </tbody>
  </table>

  {#each rows as row, index (row)}
    <Item
      {container}
      {index}
      {items}
      {row}
      {slices}
      {slicesSize}
      {timezone}
      on:click={itemOnClick} />
  {/each}
</div>
