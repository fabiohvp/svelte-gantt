<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  export let coords = "";
  export let slice;
  export let type;

  const dispatch = createEventDispatcher();

  //   function getItems(slice) {
  //     const items = [];
  //     row.items.forEach(item => {
  //       const startTime = getRelativeDate[zoom](item.startTime);

  //       if (slice.startTime === startTime) {
  //         items.push(item);
  //       }
  //     });
  //     return items;
  //   }

  function onClick(e, slice) {
    dispatch("click", {
      event: e,
      slice
    });
  }
</script>

<span
  on:click={e => onClick(e, slice)}
  class:align-center={true}
  class:flex={true}
  class:slice={true}
  startTime={slice.startTime}
  endTime={slice.endTime}
  {coords}
  {...slice[type]}>
  <span class:content={true}>
    {@html slice[type].content || '&nbsp;'}
  </span>
</span>
