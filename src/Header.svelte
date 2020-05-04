<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Slice from "./Slice.svelte";
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
    const coords = getCoordinates(0, 0, item.startTime, item.endTime);
    if (coords) {
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
  <th class:fixed={true}>
    {#each headers as header}
      <span
        on:click={e => onClickStatic(e, header)}
        class:header={true}
        {...header}>
        <span class="content">
          {@html header.content}
        </span>
      </span>
    {/each}
  </th>
  <th class:generated={true}>
    <div class:group={true} class:row={true}>
      {#each getHeader[zoom](slices) as item (item)}
        <span
          on:click={e => onClickGroup(e, item)}
          class:slice={true}
          startTime={item.startTime}
          endTime={item.endTime}
          style={getStyle(item, cells)}
          {...item}>
          <span class:content={true}>
            {@html item.content || '&nbsp;'}
          </span>
        </span>
      {/each}
    </div>
    <div class:group={true} class:row={true}>
      {#each slices as slice (slice)}
        <Slice {slice} type="header" on:click={onClickHeader} />
      {/each}
    </div>
  </th>
</tr>
