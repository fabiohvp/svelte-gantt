<script>
  import { createEventDispatcher } from "svelte";
  import scroll from "./scroll.js";
  import utils from "./utils.js";
  //   import Header from "./Header.svelte";
  //   import Row from "./Row.svelte";
  //   import Rows from "./Rows.svelte";
  import BodyRow from "./BodyRow.svelte";
  import HeaderColumns from "./HeaderColumns.svelte";
  import HeaderGroup from "./HeaderGroup.svelte";
  import HeaderRow from "./HeaderRow.svelte";
  import Item from "./Item.svelte";

  export let endTime;
  export let formatHeader = (s, e, z) => s;
  export let formatSlice = (s, z) => s;
  export let getRelativeDate = {
    year: date => {
      let newDate = new Date(date);
      newDate = new Date(newDate.getFullYear(), 0, 1);
      return newDate.getTime();
    },
    month: date => {
      let newDate = new Date(date);
      newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      return newDate.getTime();
    },
    day: date => {
      let newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate.getTime();
    },
    hour: date => {
      let newDate = new Date(date);
      return newDate.getTime();
    }
  };
  export let getHeader = {
    year: slices => {
      const groups = utils.groupBy(slices, slice =>
        slice.startDate.getFullYear()
      );
      const items = [];

      for (let i in groups) {
        const first = groups[i][0];
        const last = groups[i][groups[i].length - 1];
        const item = {
          startDate: first.startDate,
          startTime: first.startTime,
          endDate: last.startDate,
          endTime: last.startTime
        };
        items.push(formatHeader(item, zoom));
      }
      return items;
    },
    month: slices => {
      const groups = utils.groupBy(slices, slice =>
        slice.startDate.getFullYear()
      );
      const items = [];

      for (let i in groups) {
        const first = groups[i][0];
        const last = groups[i][groups[i].length - 1];
        const item = {
          startDate: first.startDate,
          startTime: first.startTime,
          endDate: last.startDate,
          endTime: last.startTime
        };
        items.push(formatHeader(item, zoom));
      }
      return items;
    },
    day: slices => {
      const groups = utils.groupBy(
        slices,
        slice =>
          `${slice.startDate.getFullYear()}-${slice.startDate.getMonth()}`
      );
      const items = [];

      for (let i in groups) {
        const first = groups[i][0];
        const last = groups[i][groups[i].length - 1];
        const item = {
          startDate: first.startDate,
          startTime: first.startTime,
          endDate: last.startDate,
          endTime: last.startTime
        };
        items.push(formatHeader(item, zoom));
      }
      return items;
    },
    hour: slices => {
      const groups = utils.groupBy(slices, slice => slice.startDate.getDate());
      const items = [];

      for (let i in groups) {
        const first = groups[i][0];
        const last = groups[i][groups[i].length - 1];
        const item = {
          startDate: first.startDate,
          startTime: first.startTime,
          endDate: last.startDate,
          endTime: last.startTime
        };
        items.push(formatHeader(item, zoom));
      }
      return items;
    }
  };
  export let getSlices = {
    year: (startTime, endTime) => {
      const _slices = [];
      let date = new Date(startTime.getFullYear(), 0, 1);
      const end = new Date(endTime.getFullYear(), 11, 31);

      while (date <= end) {
        const current = utils.addYears(date, 1);
        const _endDate = new Date(current.getFullYear(), 12, 31);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = getSlice(date, _endDate);
        _slices.push(formatSlice(_slice, zoom));
        date = current;
      }
      return _slices;
    },
    month: (startTime, endTime) => {
      const _slices = [];
      let date = new Date(startTime);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      const end = new Date(endTime);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);

      while (date <= end) {
        const current = utils.addMonths(date, 1);
        const _endDate = utils.getLastDayOfMonth(date);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = getSlice(date, _endDate);
        _slices.push(formatSlice(_slice, zoom));
        date = current;
      }
      return _slices;
    },
    day: (startTime, endTime) => {
      const _slices = [];
      let date = new Date(startTime);
      date.setHours(0, 0, 0, 0);
      const end = new Date(endTime);
      end.setHours(23, 59, 59, 999);

      while (date <= end) {
        const current = utils.addDays(date, 1);
        const _startTime = date.getTime();
        const _endDate = new Date(_startTime);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = getSlice(date, _endDate);
        _slices.push(formatSlice(_slice, zoom));
        date = current;
      }
      return _slices;
    },
    hour: (startTime, endTime) => {
      const _slices = [];
      let date = new Date(startTime);
      date.setMinutes(0, 0, 0);
      const end = new Date(endTime);
      end.setMinutes(59, 59, 999);

      while (date <= end) {
        const current = utils.addHours(date, 1);
        const _startTime = date.getTime();
        const _endDate = new Date(_startTime);
        _endDate.setMinutes(59, 59, 999);

        const _slice = getSlice(date, _endDate);
        _slices.push(formatSlice(_slice, zoom));
        date = current;
      }
      return _slices;
    }
  };
  export let headers;
  export let rows;
  export let slider;
  export let slices;
  export let startTime;
  export let zoom;

  const dispatch = createEventDispatcher();
  let container;
  let resizeCount = 0;
  let window;

  $: updateSlices(slices, resizeCount, zoom);

  function updateSlices(_slices, resizeCount, zoom) {
    slices = getSlices[zoom](new Date(startTime), new Date(endTime));
  }

  function getSlice(startDate, endDate) {
    return {
      startDate: startDate,
      startTime: startDate.getTime(),
      endDate: endDate,
      endTime: endDate.getTime(),
      body: {},
      header: {}
    };
  }

  function onClickHeader(e) {
    dispatch("click.header", e.detail);
  }

  function onClickItem(e) {
    dispatch("click.item", e.detail);
  }

  function onClickRow(e) {
    dispatch("click.row", e.detail);
  }

  function onResize(e) {
    resizeCount++;
  }

  export function getCoordinates(index, index2, startTime, endTime) {
    const startTimeRelative = getRelativeDate[zoom](startTime);
    const endTimeRelative = getRelativeDate[zoom](endTime);

    const startCell = container.querySelector(
      `.slice[coords="${index},${index2}"][starttime="${startTimeRelative}"]`
    );
    const endCell = container.querySelector(
      `.slice[coords="${index},${index2}"][starttime="${endTimeRelative}"]`
    );

    if (startCell && endCell) {
      const startCoords = utils.offset(startCell);
      const endCoords = utils.offset(endCell);
      const top = startCoords.top /*- container.offsetTop*/;
      const left = startCoords.left /*- container.offsetLeft*/;

      return {
        startCell,
        endCell,
        top,
        left,
        height: startCoords.bottom - top,
        width: endCoords.right - left
      };
    }
    return undefined;
  }
</script>

<svelte:window on:resize={onResize} />

<div bind:this={container} class="svelte-gantt">
  <div class="header-side-group">
    <div class="header-side align-center">
      {#each headers as header}
        <div
          on:click={e => onClickHeader(e)}
          class:align-center={true}
          class:slice={true}
          {...header}>
          <span class="content">
            {@html header.content}
          </span>
        </div>
      {/each}
    </div>
    {#each rows as row, index (row)}
      <HeaderColumns headers={row.headers} bind:row on:click={onClickHeader} />
    {/each}
  </div>
  <div style="flex: 1;">
    <div class="header-group noselect" use:scroll={slider}>
      {#if container}
        <HeaderGroup {getCoordinates} {getHeader} {slices} {zoom} />
      {/if}
    </div>
    <div class="header-slices">
      <HeaderRow {slices} />
    </div>
    {#each rows as row, index (row)}
      <BodyRow {index} bind:row {slices} />
    {/each}
  </div>

  {#if container}
    {#each rows as row, index (row)}
      <Item
        {index}
        {getCoordinates}
        {getRelativeDate}
        {row}
        {slices}
        {zoom}
        on:click={onClickItem} />
    {/each}
  {/if}
</div>
