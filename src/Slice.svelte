<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  const dispatch = createEventDispatcher();
  export let slice;
  export let type;

  let element;

  export function getOffset() {
    return utils.offset(element);
  }

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
  bind:this={element}
  on:click={e => onClick(e, slice)}
  class:slice={true}
  startTime={slice.startTime}
  endTime={slice.endTime}
  {...slice[type]}>
  <span class:content={true}>
    {@html slice[type].content || '&nbsp;'}
  </span>
</span>
