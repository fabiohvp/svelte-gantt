<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let index;
  export let cells;
  export let getRelativeDate;
  export let row;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getItems(slice) {
    const items = [];
    row.items.forEach(item => {
      const startTime = getRelativeDate[zoom](item.startTime);

      if (slice.startTime === startTime) {
        items.push(item);
      }
    });
    return items;
  }

  function onClick(e, slice, index) {
    dispatch("click", {
      event: e,
      slice,
      index,
      items: getItems(slice)
    });
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
  }
</script>

<style>
  div.column.header {
    height: 1.5em;
    overflow: hidden;
  }
</style>

<tr class:even={index % 2 === 0} class:odd={index % 2 !== 0}>
  {#each row.headers as header (header)}
    <td
      class:fix={true}
      class:column={true}
      class:header={true}
      class:row={true}
      on:click={() => (row.expanded = !row.expanded)}
      {...header}>
      <div class="column header">
        {@html header.content || ''}
      </div>
    </td>
  {/each}

  <td colspan={slices.length}>
    <div class="cell">
      {#each slices as slice (slice)}
        <span
          bind:this={cells[`${index},${slice.startTime}`]}
          on:click={e => onClick(e, slice, index)}
          class:column={true}
          class:slice={true}
          class:row={true}
          startTime={slice.startTime}
          endTime={slice.endTime}
          {...slice.body}>
          {@html slice.body.content || ''}
        </span>
      {/each}
    </div>
  </td>
</tr>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      index={`${index},${index2}`}
      bind:cells
      {getRelativeDate}
      bind:row={child}
      {slices}
      {zoom}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
