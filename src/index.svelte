<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
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
  export let slices;
  export let startTime;
  export let zoom;

  const dispatch = createEventDispatcher();
  let container;
  let cells;
  let resizeCount = 0;

  $: updateSlices(slices, resizeCount, zoom);
  $: (cells = {}), zoom;

  function updateSlices(_slices, resizeCount, zoom) {
    slices = getSlices[zoom](new Date(startTime), new Date(endTime));
    setTimeout(() => {
      rows = rows;
    }, 1);
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

  export function getCoordinates(index, index2, startTime, endTime) {
    const startTimeRelative = getRelativeDate[zoom](startTime);
    const endTimeRelative = getRelativeDate[zoom](endTime);

    const startCell = cells[`${index},${index2},${startTimeRelative}`];
    const endCell = cells[`${index},${index2},${endTimeRelative}`];

    if (startCell && endCell) {
      if (startCell.getOffset && endCell.getOffset) {
        const startCoords = startCell.getOffset();
        const endCoords = endCell.getOffset();
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
    }

    return undefined;
  }

  function onResize(e) {
    resizeCount++;
  }
</script>

<svelte:window on:resize={onResize} />

<!-- <script context="module">
  import "./tailwind.css";
</script> -->
<div class="svelte-gantt">
  <div bind:this={container} class="container">
    <table {zoom} {startTime} {endTime}>
      <thead>
        <Header
          {cells}
          {getCoordinates}
          {getHeader}
          {headers}
          {slices}
          {zoom}
          on:click={onClickHeader} />
      </thead>
      <tbody>
        {#each rows as row, index (row)}
          <Row
            {index}
            bind:cells
            {getRelativeDate}
            bind:row
            {slices}
            {zoom}
            on:click={onClickRow} />
        {/each}
      </tbody>
    </table>

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
  </div>
</div>
