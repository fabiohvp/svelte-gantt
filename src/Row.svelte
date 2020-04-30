<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Slice from "./Slice.svelte";
  export let index;
  export let index2 = 0;
  export let cells;
  export let getRelativeDate;
  export let row;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();
  $: indexSum = index + index2;

  function onClickCell(e) {
    dispatch("click", e.detail);
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
  }
</script>

<tr
  class:even={indexSum % 2 === 0}
  class:odd={indexSum % 2 !== 0}
  {index}
  {index2}>
  {#each row.headers as header (header)}
    <td class:fixed={true}>
      <div
        on:click={() => (row.expanded = !row.expanded)}
        class:header={true}
        {...header}>
        <span class:content={true}>
          {@html header.content || '&nbsp;'}
        </span>
      </div>
    </td>
  {/each}

  <td class:generated={true}>
    <div class:group={true}>
      <div class:flex={true}>
        {#each slices as _slice (_slice)}
          <Slice
            slice={_slice}
            type="body"
            bind:this={cells[`${index},${index2},${_slice.startTime}`]}
            on:click={onClickCell} />
        {/each}
      </div>
    </div>
  </td>
</tr>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      {index}
      index2={index2 + 1}
      bind:cells
      {getRelativeDate}
      bind:row={child}
      {slices}
      {zoom}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
