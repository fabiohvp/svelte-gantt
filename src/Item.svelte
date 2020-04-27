<script>
  import { createEventDispatcher } from "svelte";
  export let container;
  export let index;
  export let cells;
  export let getCoordinates;
  export let getDateWithTimezone;
  export let row;
  export let slices;
  export let slicesSize;
  export let timezone;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getStyle(cells, item) {
    const coords = getCoordinates(index, item.startDate, item.endDate);
    if (coords) {
      return `display:block;top:${coords.top}px;left:${coords.left}px;height:${coords.height}px;width:${coords.width}px;`;
    }
    return "";
  }

  function onChildrenClick(e) {
    dispatch("click", e.detail);
  }

  function onClick(e, item) {
    dispatch("click", {
      event: e,
      item,
      slice: slices[getDateWithTimezone(item.startDate)]
    });
  }
</script>

<style>
  .item {
    position: absolute;
    height: 1.5em;
    display: none;
    opacity: 0.6;
  }
</style>

{#each row.items as item (item)}
  <div
    on:click={e => onClick(e, item)}
    class:item={true}
    startDate={item.startDate}
    endDate={item.endDate}
    style={getStyle(cells, item)}
    {...item}>
    {@html item.content || ''}
  </div>
{/each}

{#if row.expanded && row.children}
  {#each row.children as child, index2 (child)}
    <svelte:self
      {container}
      index={`${index},${index2}`}
      {cells}
      {getCoordinates}
      {getDateWithTimezone}
      row={child}
      {slices}
      {slicesSize}
      {timezone}
      {zoom}
      on:click={e => onChildrenClick(e)} />
  {/each}
{/if}
