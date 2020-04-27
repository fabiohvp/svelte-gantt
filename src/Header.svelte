<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let header;
  export let slices;
  export let slicesSize;

  let tr;

  const dispatch = createEventDispatcher();

  onMount(() => {
    header.generate(tr, slices, slicesSize);
  });
</script>

<style>
  tr {
    position: relative;
  }
</style>

<tr class="tr" bind:this={tr}>
  {#each header.statics as th}
    <th class:column={true} class:static={true} {...th}>
      {@html th.content}
    </th>
  {/each}
  <!-- {#each slices as slice}
    <th
      class:column={true}
      class:header={true}
      startdate={slice.startdate}
      enddate={slice.enddate} />
  {/each} -->
</tr>
