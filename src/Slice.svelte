<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  export let index = "";
  export let slice;
  export let type;

  const dispatch = createEventDispatcher();

  function onClick(e, slice) {
    dispatch("click", {
      event: e,
      target: "slice",
      type,
      slice,
    });
  }
</script>

<span
  on:click={(e) => onClick(e, slice)}
  bind:this={slice.element}
  class:align-center={true}
  class:flex={true}
  class:slice={true}
  startTime={slice.startTime}
  endTime={slice.endTime}
  {index}
  {...slice[type]}>
  <span class:content={true}>
    {@html slice[type].content || '&nbsp;'}
  </span>
</span>
