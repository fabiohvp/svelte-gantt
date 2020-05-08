<script>
  import { createEventDispatcher } from "svelte";
  import Item from "./Item.svelte";
  import Slice from "./Slice.svelte";
  export let index;
  export let index2 = 0;
  export let row;
  export let slices;

  export let getCoordinates;
  export let getRelativeDate;
  export let zoom;

  const dispatch = createEventDispatcher();

  function onClickCell(e) {
    dispatch("click", e.detail);
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
  }

  function onClickItem(e) {
    dispatch("click", e.detail);
  }
</script>

<div class="row relative">
  <div class="body-slices noselect row-height">
    {#each slices as _slice (_slice)}
      <Slice
        coords={`${index},${index2}`}
        slice={_slice}
        type="body"
        on:click={onClickCell} />
    {/each}
  </div>
  <Item
    {index}
    {getCoordinates}
    {getRelativeDate}
    {row}
    {slices}
    {zoom}
    on:click={onClickItem} />
</div>

{#if row.expanded && row.children}
  {#each row.children as child, index2}
    <svelte:self
      {index}
      index2={index2 + 1}
      bind:row={child}
      {slices}
      {getCoordinates}
      {getRelativeDate}
      {zoom}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
