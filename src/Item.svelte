<script>
  import { createEventDispatcher } from "svelte";
  export let index;
  export let getCoordinates;
  export let getRelativeDate;
  export let row;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getStyle(item) {
    const coords = getCoordinates(index, item.startTime, item.endTime);
    if (coords) {
      return `display:block;top:${coords.top}px;left:${coords.left}px;height:${coords.height}px;width:${coords.width}px;`;
    }
    return "";
  }

  function onClick(e, item, index) {
    dispatch("click", {
      event: e,
      item,
      index,
      slice: slices[getRelativeDate[zoom](item.startTime)]
    });
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
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
    on:click={e => onClick(e, item, index)}
    class:row={true}
    class:item={true}
    startTime={item.startTime}
    endTime={item.endTime}
    style={getStyle(item)}
    {...item}>
    {@html item.content || ''}
  </div>
{/each}

{#if row.expanded && row.children}
  {#each row.children as child, index2 (child)}
    <svelte:self
      index={`${index},${index2}`}
      {getCoordinates}
      {getRelativeDate}
      row={child}
      {slices}
      {zoom}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
