<script>
  import { createEventDispatcher, onMount } from "svelte";
  import utils from "./utils.js";
  export let cells;
  export let getCoordinates;
  export let getHeader;
  export let headers;
  export let slices;
  export let zoom;

  const dispatch = createEventDispatcher();
  let tr;

  function getStyle(item, cells) {
    const coords = getCoordinates(0, item.startTime, item.endTime);
    if (coords) {
      const trCoords = utils.offset(tr);
      return `display:block;top:${trCoords.top}px;left:${coords.left}px;height:${trCoords.height}px;width:${coords.width}px;`;
    }
    return "";
  }

  function onClickHeader(e, slice) {
    dispatch("click", {
      event: e,
      slice,
      type: "cell"
    });
  }

  function onClickGroup(e, item) {
    dispatch("click", {
      event: e,
      item,
      type: "group"
    });
  }

  function onClickStatic(e, header) {
    dispatch("click", {
      event: e,
      header,
      type: "static"
    });
  }
</script>

<style>
  .item {
    position: absolute;
    height: 1.5em;
    overflow: hidden;
  }
</style>

<tr bind:this={tr}>
  <th rowspan={2}>
    {#each headers as header}
      <div
        on:click={e => onClickStatic(e, header)}
        class:fix={true}
        class:column={true}
        class:header={true}
        class:static={true}
        {...header}>
        {@html header.content}
      </div>
    {/each}
  </th>
  <th>
    {#each getHeader[zoom](slices) as item (item)}
      <div
        on:click={e => onClickGroup(e, item)}
        class:column={true}
        class:header={true}
        class:item={true}
        startTime={item.startTime}
        endTime={item.endTime}
        style={getStyle(item, cells)}
        {...item}>
        {@html item.content || ''}
      </div>
    {/each}
  </th>
</tr>
<tr>
  <th colspan={slices.length}>
    &nbsp;
    <div class="cell">
      {#each slices as slice (slice)}
        <span
          on:click={e => onClickHeader(e, slice)}
          class:column={true}
          class:slice={true}
          class:header={true}
          startTime={slice.startTime}
          endTime={slice.endTime}
          {...slice.header}>
          {@html slice.header.content || ''}
        </span>
      {/each}
    </div>
  </th>
</tr>
