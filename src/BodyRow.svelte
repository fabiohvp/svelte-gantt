<script>
  import { createEventDispatcher } from "svelte";
  import Item from "./Item.svelte";
  import Slice from "./Slice.svelte";
  export let index;
  export let row;
  export let slices;

  export let getCoordinates;
  export let getRelativeDate;
  export let zoom;

  const dispatch = createEventDispatcher();

  function onClick(e) {
    dispatch("click", e.detail);
  }
</script>

<div class="row relative">
  <div class="body-slices row-height">
    {#each slices as _slice (_slice)}
      <Slice {index} slice={_slice} type="body" on:click={onClick} />
    {/each}
  </div>
  <Item
    {index}
    {getCoordinates}
    {getRelativeDate}
    {row}
    {slices}
    {zoom}
    on:click={onClick} />
</div>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      index={index + '-' + index2}
      bind:row={child}
      {slices}
      {getCoordinates}
      {getRelativeDate}
      {zoom}
      on:click={onClick} />
  {/each}
{/if}
