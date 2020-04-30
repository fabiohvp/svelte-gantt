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
      const height = (item.getHeight || ((item, coords) => coords.height))(
        item,
        coords
      );
      const width = (item.getWidth || ((item, coords) => coords.width))(
        item,
        coords
      );
      return `display:flex;top:${coords.top}px;left:${coords.left}px;width:${width}px;height:${height}px;`;
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

{#each row.items as item (item)}
  <div
    on:click={e => onClick(e, item, index)}
    class:absolute={true}
    class:generated={true}
    class:item={true}
    startTime={item.startTime}
    endTime={item.endTime}
    style={getStyle(item)}
    {...item}>
    <span class:content={true}>
      {@html item.content || '&nbsp;'}
    </span>
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
