<script>
  import { createEventDispatcher } from "svelte";
  import dateUtils from "./utils.js";
  export let container;
  export let index;
  export let items;
  export let row;
  export let slices;
  export let slicesSize;
  export let timezone;

  const dispatch = createEventDispatcher();

  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      bottom: rect.bottom + scrollTop,
      right: rect.right + scrollLeft
    };
  }

  function getStyle(items, item) {
    const startDate = dateUtils.getDateWithTimezone(
      item.startDate,
      slicesSize,
      timezone
    );
    const endDate = dateUtils.getDateWithTimezone(
      item.endDate,
      slicesSize,
      timezone
    );

    const firstItem = items[`${index},${startDate}`];
    const lastItem = items[`${index},${endDate}`];

    if (firstItem && lastItem) {
      const firstItemCoords = offset(firstItem);
      const lastItemCoords = offset(lastItem);
      const styles = [];

      styles.push("display:block");
      styles.push(`top:${firstItemCoords.top - container.offsetTop}px`);
      styles.push(`left:${firstItemCoords.left - container.offsetLeft}px`);
      styles.push(`width:${lastItemCoords.right - firstItemCoords.left}px`);

      return styles.join(";");
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
      slice:
        slices[
          dateUtils.getDateWithTimezone(item.startDate, slicesSize, timezone)
        ]
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
    style={getStyle(items, item)}
    {...item}>
    {@html item.content || ''}
  </div>
{/each}

{#if row.expanded && row.children}
  {#each row.children as child, index2 (child)}
    <svelte:self
      {container}
      index={`${index},${index2}`}
      {items}
      row={child}
      {slices}
      {slicesSize}
      {timezone}
      on:click={e => onChildrenClick(e)} />
  {/each}
{/if}
