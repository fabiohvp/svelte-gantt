<script context="module">
  import "./tailwind.css";
</script>

<script>
  import { onMount } from "svelte";
  //import {setContext} from "svelte";
  import dateUtils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import Item from "./Item.svelte";

  export let endDate;
  export let formatSlice = (c, s) => slice;
  export let headers;
  export let rows;
  export let slicesSize;
  export let startDate;
  export let zoom;

  let container;
  let items;

  $: timezone = new Date(startDate).getTimezoneOffset() * 60 * 1000; //milliseconds
  $: slicesCount = zoom / slicesSize;
  $: columns = getColumns(startDate, endDate, zoom, slicesCount);
  $: slices = getSlices(startDate, endDate, slicesSize, slicesCount);
  $: (items = {}), slicesCount;

  function getColumns(startDate, endDate, zoom, slicesCount) {
    const _columns = [];
    let date = startDate;

    while (date <= endDate) {
      _columns.push({
        startDate: date,
        endDate: date + zoom - 1
      });

      date += zoom;
    }
    return _columns;
  }

  function getSlices(startDate, endDate, slicesSize, slicesCount) {
    return columns.reduce((map, column) => {
      const slices = [];

      for (let i = column.startDate; i <= column.endDate; i += slicesSize) {
        const slice = { startDate: i, endDate: i + slicesSize - 1 };
        slices.push(formatSlice(column, slice));
      }

      map[column.startDate] = slices;
      return map;
    }, {});
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

  .svelte-gantt table :global(td),
  .svelte-gantt table :global(th) {
    margin: 0 0;
    padding: 0 0;
  }
</style>

<div bind:this={container} class="svelte-gantt">
  <table>
    <thead>
      <Header {columns} {headers} {slices} {slicesCount} {slicesSize} {zoom} />
    </thead>
    <tbody>
      {#each rows as row, index}
        <Row
          {columns}
          {formatSlice}
          {index}
          bind:items
          bind:row
          {slices}
          {slicesSize} />
      {/each}
    </tbody>
  </table>

  {#each rows as row, index}
    <Item
      {container}
      {index}
      {items}
      {row}
      {slicesCount}
      {slicesSize}
      {timezone} />
  {/each}
</div>
