<script>
  import { createEventDispatcher } from "svelte";
  import Slice from "./Slice.svelte";
  export let slices;

  const dispatch = createEventDispatcher();

  function onClick(e, slice) {
    dispatch("click", {
      event: e,
      slice,
      type: "cell"
    });
  }
</script>

{#each slices as slice (slice)}
  <Slice {slice} type="header" on:click={onClick} />
{/each}
