<script>
  import { createEventDispatcher, onMount } from "svelte";
  import utils from "./utils.js";
  export let cells;
  export let getCoordinates;
  export let getHeader;
  export let header;
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

  function onClick(e) {
    console.log("xx");
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
  <th>
    {#each header as header}
      <div
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
        on:click={e => onClick(e, item)}
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
  {#each header as header}
    <th class:column={true} class:header={true} class:static={true} {...header}>
      {@html header.content}
    </th>
  {/each}
  <th colspan={slices.length}>
    <div class="cell">
      {#each slices as slice (slice)}
        <span
          on:click={e => onClick(e, slice)}
          class:column={true}
          class:slice={true}
          startTime={slice.startTime}
          endTime={slice.endTime}
          {...slice}>
          {@html slice.content || ''}
        </span>
      {/each}
    </div>
  </th>
</tr>
