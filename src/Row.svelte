<script>
  import { createEventDispatcher } from "svelte";
  import Slice from "./Slice.svelte";
  export let index;
  export let index2 = 0;
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
  <td class:fixed={true}>
    {#each row.headers as header (header)}
      <span
        on:click={() => (row.expanded = !row.expanded)}
        class:border={true}
        class:header={true}
        {...header}>
        <span class:content={true}>
          {@html header.content || '&nbsp;'}
        </span>
      </span>
    {/each}
  </td>

  <td class:generated={true}>
    <div class:group={true}>
      {#each slices as _slice (_slice)}
        <Slice
          coords={`${index},${index2}`}
          slice={_slice}
          type="body"
          on:click={onClickCell} />
      {/each}
    </div>
  </td>
</tr>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      {index}
      index2={index2 + 1}
      {getRelativeDate}
      bind:row={child}
      {slices}
      {zoom}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
