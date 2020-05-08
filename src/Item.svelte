<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  export let index;
  export let index2 = 0;
  export let getCoordinates;
  export let getRelativeDate;
  export let row;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();
  $: indexSum = index + index2;

  function getStyle(item) {
    const coords = getCoordinates(index, index2, item.startTime, item.endTime);
    if (coords) {
      return `display:flex;top:${coords.top}px;left:${coords.left}px;width:${coords.width}px;height:${coords.height}px;`;
    }
    return "";
  }

  function onClick(e, item, index) {
    dispatch("click", {
      event: e,
      item,
      index,
      slice: slices[getRelativeDate[zoom](item.startTime)]
    });
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
  }
</script>

{#each row.items as item (item)}
  <div
    class:absolute={true}
    class:item={true}
    {index}
    {index2}
    startTime={item.startTime}
    endTime={item.endTime}
    style={getStyle(item)}
    {...item}>
    <span
      class:content={true}
      class:align-center={true}
      on:click={e => onClick(e, item, index)}>
      {@html item.content || '&nbsp;'}
    </span>
  </div>
{/each}
