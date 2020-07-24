<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  export let index;
  export let getCoordinates;
  export let getRelativeDate;
  export let row;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();

  function getStyle(item) {
    const coords = getCoordinates(index, item.startTime, item.endTime);
    if (coords) {
      return `display:flex;top:${coords.top}px;left:${coords.left}px;width:${coords.width}px;height:${coords.height}px;`;
    }
    return "";
  }

  function onClick(e, item, index) {
    dispatch("click", {
      event: e,
      target: "item",
      item,
      index,
      slices: slices.filter(
        (o) =>
          o.startTime >= getRelativeDate[zoom](item.startTime) &&
          o.startTime <= getRelativeDate[zoom](item.endTime)
      ),
    });
  }
</script>

{#each row.items as item (item)}
  <div
    class:absolute={true}
    class:item={true}
    {index}
    startTime={item.startTime}
    endTime={item.endTime}
    style={getStyle(item)}
    {...item}>
    <span
      class:content={true}
      class:align-center={true}
      on:click={(e) => onClick(e, item, index)}>
      {@html item.content || '&nbsp;'}
    </span>
  </div>
{/each}
