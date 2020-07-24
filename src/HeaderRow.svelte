<script>
  import { createEventDispatcher } from "svelte";
  import Slice from "./Slice.svelte";
  export let slices;

  const dispatch = createEventDispatcher();
  const type = "header";

  function onClick(e, slice) {
    dispatch("click", e.detail);
  }
</script>

{#each slices as slice (slice)}
  <Slice {slice} {type} on:click={onClick} />
{/each}
