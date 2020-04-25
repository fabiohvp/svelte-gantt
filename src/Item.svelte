<script>
  export let container;
  export let index;
  export let items;
  export let row;
  export let slicesCount;
  export let slicesSize;
  export let timezone;

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
    //por que precisa do timezone aqui? não faço idéia
    const startDate = item.startDate - (item.startDate % slicesSize) + timezone;
    const endDate = item.endDate - (item.endDate % slicesSize) + timezone;

    const firstItem = items[index + "," + startDate];
    const lastItem = items[index + "," + endDate];

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
</script>

<style>
  .item {
    position: absolute;
    min-width: 20px;
    height: 20px;
    background-color: orange;
    display: none;
    opacity: 0.6;
  }
</style>

{#each row.items as item}
  <div
    class:item={true}
    startDate={item.startDate}
    endDate={item.endDate}
    style={getStyle(items, item)}
    {...item}>
    {@html item.content || ''}
  </div>
{/each}

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      {container}
      index={index + ',' + index2}
      {items}
      row={child}
      {slicesCount}
      {slicesSize}
      {timezone} />
  {/each}
{/if}
