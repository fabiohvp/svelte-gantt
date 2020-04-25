<script>
  export let columns;
  export let formatSlice;
  export let index;
  export let items;
  export let row;
  export let slices;
  export let slicesSize;
</script>

<style>
  .column.slices {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 100%;
  }

  div.column.header {
    height: 1.5em;
    overflow: hidden;
  }
</style>

<tr class="row">
  {#each row.headers as header}
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

  {#each columns as column}
    <td
      class="column value"
      startDate={column.startDate}
      endDate={column.endDate}>
      <div class="column slices">
        {#each slices[column.startDate] as slice}
          <span
            bind:this={items[index + ',' + slice.startDate]}
            on:click={() => console.log(slice, column)}
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
  {/each}
</tr>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      {columns}
      {formatSlice}
      index={index + ',' + index2}
      bind:items
      bind:row={child}
      {slices}
      {slicesSize} />
  {/each}
{/if}
