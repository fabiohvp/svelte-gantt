<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let index;
  export let cells;
  export let getDateRelative;
  export let row;
  export let slices;
  export let timezone;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getItems(slice) {
    const items = [];
    row.items.forEach(item => {
      const startDate = getDateRelative[zoom](item.startDate);

      if (slice.startDate === startDate) {
        items.push(item);
      }
    });
    return items;
  }

  function onChildrenClick(e) {
    dispatch("click", e.detail);
  }

  function onClick(e, slice) {
    dispatch("click", {
      event: e,
      slice,
      items: getItems(slice)
    });
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
      class:column={true}
      class:header={true}
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
          bind:this={cells[`${index},${slice.startDate}`]}
          on:click={e => onClick(e, slice)}
          class:column={true}
          class:slice={true}
          startDate={slice.startDate}
          endDate={slice.endDate}
          {...slice}>
          {@html slice.content || ''}
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
      {getDateRelative}
      bind:row={child}
      {slices}
      {timezone}
      {zoom}
      on:click={e => onChildrenClick(e)} />
  {/each}
{/if}
