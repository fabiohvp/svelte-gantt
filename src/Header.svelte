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
      return `width:${coords.width}px;`;
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

<tr bind:this={tr}>
  <th class:fix={true} class:header={true}>
    {#each headers as header}
      <div on:click={e => onClickStatic(e, header)} {...header}>
        <span class="content">
          {@html header.content}
        </span>
      </div>
    {/each}
  </th>
  <th class:generated={true} class:header={true}>
    <div class="group">
      &nbsp;
      {#each getHeader[zoom](slices) as item (item)}
        <span
          on:click={e => onClickGroup(e, item)}
          class:header={true}
          class:asbolute={true}
          startTime={item.startTime}
          endTime={item.endTime}
          style={getStyle(item, cells)}
          {...item}>
          <span class="content">
            {@html item.content || ''}
          </span>
        </span>
      {/each}
    </div>
    <div class="cell">
      {#each slices as slice (slice)}
        <span
          on:click={e => onClickHeader(e, slice)}
          class:slice={true}
          class:header={true}
          startTime={slice.startTime}
          endTime={slice.endTime}
          {...slice.header}>
          <span class="content">
            {@html slice.header.content || ''}
          </span>
        </span>
      {/each}
    </div>
  </th>
</tr>
