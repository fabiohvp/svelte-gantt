<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Slice from "./Slice.svelte";
  export let getCoordinates;
  export let getHeader;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getStyle(item) {
    const coords = getCoordinates(0, item.startTime, item.endTime);
    if (coords) {
      return `width:${coords.width}px;`;
    }
    return "";
  }

  function onClick(e, item) {
    dispatch("click", {
      event: e,
      item,
      type: "header",
    });
  }
</script>

{#each getHeader[zoom](slices) as item (item)}
  <span
    on:click={(e) => onClick(e, item)}
    class:align-center={true}
    class:slice={true}
    startTime={item.startTime}
    endTime={item.endTime}
    style={getStyle(item)}
    {...item}>
    <span class:content={true}>
      {@html item.content || '&nbsp;'}
    </span>
  </span>
{/each}
