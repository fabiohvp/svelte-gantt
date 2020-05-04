<script>
  import { createEventDispatcher } from "svelte";
  import Row from "./Row.svelte";
  export let getRelativeDate;
  export let rows;
  export let slices;
  export let zoom;
  const dispatch = createEventDispatcher();

  function onLoad() {
    setTimeout(() => {
      dispatch("loaded");
    }, 0);
    return "";
  }

  function onClickRow(e) {
    dispatch("click", e.detail);
  }
</script>

{#each rows as row, index (row)}
  <Row
    {index}
    {getRelativeDate}
    bind:row
    {slices}
    {zoom}
    on:click={onClickRow} />
{/each}
{onLoad()}
