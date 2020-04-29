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
      return `top:${trCoords.top}px;left:${coords.left}px;width:${coords.width}px;`;
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
  <th class:fix={true} class:group={true}>
    {#each headers as header}
      <div on:click={e => onClickStatic(e, header)} {...header}>
        <span class="content">
          {@html header.content}
        </span>
      </div>
    {/each}
  </th>
  <th class:generated={true} class:group={true}>
    &nbsp;
    {#each getHeader[zoom](slices) as item (item)}
      <div
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
      </div>
    {/each}
  </th>
</tr>
<tr>
  <th class:fix={true} class:title={true}>
    &nbsp;
    {#each headers as header}
      <div on:click={e => onClickStatic(e, header)}>
        <span class="content" />
      </div>
    {/each}
  </th>
  <th colspan={slices.length} class:generated={true} class:title={true}>
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
