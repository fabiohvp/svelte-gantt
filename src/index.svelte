<script context="module">
  import "./tailwind.css";
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import Item from "./Item.svelte";

  //   function groupBy(array, key) {
  //     return array.reduce(function(map, item) {
  //       (map[item[key]] = map[item[key]] || []).push(item);
  //       return map;
  //     }, {});
  //   }
  function groupBy(array, fnKey) {
    return array.reduce(function(map, item) {
      const key = fnKey(item);
      (map[key] = map[key] || []).push(item);
      return map;
    }, {});
  }

  export let endTime;
  export let formatHeader = (s, e) => s;
  export let formatSlice = s => s;
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
      const groups = groupBy(slices, slice => slice.startDate.getFullYear());
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
        items.push(formatHeader(item));
      }
      return items;
    },
    month: slices => {
      const groups = groupBy(slices, slice => slice.startDate.getFullYear());
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
        items.push(formatHeader(item));
      }
      return items;
    },
    day: slices => {
      const groups = groupBy(slices, slice => slice.startDate.getMonth());
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
        items.push(formatHeader(item));
      }
      return items;
    },
    hour: slices => {
      const groups = groupBy(slices, slice => slice.startDate.getDate());
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
        items.push(formatHeader(item));
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
        const _startTime = date.getTime();
        const _endDate = new Date(current.getFullYear(), 12, 31);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = {
          startDate: date,
          startTime: _startTime,
          endDate: _endDate,
          endTime: _endDate.getTime()
        };
        _slices.push(formatSlice(_slice));
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
        const _startTime = date.getTime();
        const _endDate = utils.getLastDayOfMonth(date);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = {
          startDate: date,
          startTime: _startTime,
          endDate: _endDate,
          endTime: _endDate.getTime()
        };
        _slices.push(formatSlice(_slice));
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

        const _slice = {
          startDate: date,
          startTime: _startTime,
          endDate: _endDate,
          endTime: _endDate.getTime()
        };
        _slices.push(formatSlice(_slice));
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

        const _slice = {
          startDate: date,
          startTime: _startTime,
          endDate: _endDate,
          endTime: _endDate.getTime()
        };
        _slices.push(formatSlice(_slice));
        date = current;
      }
      return _slices;
    }
  };
  export let header;
  export let rows;
  export let slices;
  export let startTime;
  export let zoom;

  const dispatch = createEventDispatcher();
  let container;
  let cells;

  $: slices = getSlices[zoom](new Date(startTime), new Date(endTime));
  $: (cells = {}), zoom;

  function itemOnClick(e) {
    dispatch("click.item", e.detail);
  }

  function rowOnClick(e) {
    dispatch("click.row", e.detail);
  }

  export function getCoordinates(index, startTime, endTime) {
    const startTimeRelative = getRelativeDate[zoom](startTime);
    const endTimeRelative = getRelativeDate[zoom](endTime);

    const startCell = cells[`${index},${startTimeRelative}`];
    const endCell = cells[`${index},${endTimeRelative}`];

    if (startCell && endCell) {
      const startCoords = utils.offset(startCell);
      const endCoords = utils.offset(endCell);
      const top = startCoords.top - container.offsetTop;

      return {
        startCell,
        endCell,
        top,
        left: startCoords.left - container.offsetLeft,
        height: startCoords.bottom - top,
        width: endCoords.right - startCoords.left
      };
    }

    return undefined;
  }

  function getColumnHeader(el) {
    const th = document.createElement(el);
    th.className = "cell";
    return th;
  }

  function getColumnCell() {
    const th = document.createElement("th");
    th.className = "column header";
    return th;
  }

  function getDiv(css) {
    const div = document.createElement("div");
    div.className = css;
    return div;
  }
</script>

<style>
  .svelte-gantt {
    position: relative;
  }

  table {
    width: 100%;
    color: #707070;
  }

  thead {
    background-color: #f9fafb;
  }

  .svelte-gantt thead :global(th) {
    padding: 0 0;
  }

  .svelte-gantt :global(.slice) {
    flex: 1;
  }

  .svelte-gantt :global(.cell) {
    display: flex;
  }
</style>

<div bind:this={container} class="svelte-gantt">
  <table>
    <thead>
      <Header {cells} {getCoordinates} {getHeader} {header} {slices} {zoom} />
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
          on:click={rowOnClick} />
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
      on:click={itemOnClick} />
  {/each}
</div>
