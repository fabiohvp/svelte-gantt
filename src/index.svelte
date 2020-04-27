<script context="module">
  import "./tailwind.css";
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import Item from "./Item.svelte";

  export let endDate;
  export let formatSlice = (c, s) => slice;
  export let getDateWithTimezone = date => {
    //por que precisa do timezone aqui? não faço idéia
    //if
    return date - Math.ceil(date % slicesSize) + timezone;
  };
  export let header;
  export let rows;
  export let slices;
  export let slicesSize;
  export let startDate;
  export let zoom;

  const dispatch = createEventDispatcher();
  let container;
  let cells;

  $: timezone = new Date(startDate).getTimezoneOffset() * 60 * 1000; //milliseconds
  $: slices = getSlices(startDate, endDate, slicesSize);
  $: (cells = {}), slicesSize;

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

  export function getCoordinates(index, startDate, endDate) {
    const startDateWithTimezone = getDateWithTimezone(startDate);
    const endDateWithTimezone = getDateWithTimezone(endDate);

    const startCell = cells[`${index},${startDateWithTimezone}`];
    const endCell = cells[`${index},${endDateWithTimezone}`];
    console.log(new Date(startDate), new Date(startDateWithTimezone));

    if (startCell && endCell) {
      const startCoords = utils.offset(startCell);
      const endCoords = utils.offset(endCell);
      const top = startCoords.top - container.offsetTop;

      return {
        startCell,
        endCell,
        top,
        left: startCoords.left - container.offsetLeft,
        height: startCoords.bottom - top,
        width: endCoords.right - startCoords.left
      };
    }

    return undefined;
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
          bind:cells
          {getDateWithTimezone}
          bind:row
          {slices}
          {slicesSize}
          {timezone}
          {zoom}
          on:click={rowOnClick} />
      {/each}
    </tbody>
  </table>

  {#each rows as row, index (row)}
    <Item
      {container}
      {index}
      {cells}
      {getCoordinates}
      {getDateWithTimezone}
      {row}
      {slices}
      {slicesSize}
      {timezone}
      {zoom}
      on:click={itemOnClick} />
  {/each}
</div>
