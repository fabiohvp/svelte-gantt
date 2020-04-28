<script context="module">
  import "./tailwind.css";
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import utils from "./utils.js";
  import Header from "./Header.svelte";
  import Row from "./Row.svelte";
  import Item from "./Item.svelte";

  export let endDate;
  export let formatSlice = (c, s) => slice;
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
    year: (row, slices) => {
      let lastDate = utils.addYears(slices[0].startDate, -1);
      slices.forEach(slice => {
        const currentDate = new Date(slice.startDate);
        if (lastDate.getFullYear() !== currentDate.getFullYear()) {
          const th = getColumnHeader("th");
          row.appendChild(th);
          th.innerHTML = `<div class="slice header-year">${currentDate.getFullYear()}</div>`;
          row.appendChild(th);
        }
      });
    },
    month: (row, slices) => {
      let lastDate = utils.addYears(slices[0].startDate, -1);
      let th = getColumnHeader("th");
      let div = getDiv();
      slices.forEach(slice => {
        const currentDate = new Date(slice.startDate);
        if (lastDate.getFullYear() !== currentDate.getFullYear()) {
          div = getDiv();
          th = getColumnHeader("th");
          th.setAttribute("colspan", 11 - currentDate.getMonth());
          th.innerHTML = `<div class="header-months">${currentDate.getFullYear()}</div>`;
          th.appendChild(div);
          row.appendChild(th);
        }
        div.innerHTML += `<span class="slice header-month">${currentDate.getMonth() +
          1}</span>`;
        lastDate = currentDate;
      });
    },
    day: slices => {
      let date = new Date(slices[0].startDate - 1);
      let groups = [];
      let item = {
        startDate: slices[0].startDate
      };
      let currentDate;

      const addItem = currentDate => {
        item.endDate = currentDate.getTime();
        item.content = `${currentDate.getMonth() +
          1} ${currentDate.getFullYear()}`;
        groups.push(item);
      };

      slices.forEach(slice => {
        currentDate = new Date(slice.startDate);

        if (date.getMonth() !== currentDate.getMonth()) {
          addItem(currentDate);

          item = {
            startDate: currentDate.getTime()
          };
        }

        date = currentDate;
      });

      addItem(currentDate);
      return groups;
    },
    hour: (row, slices) => {
      let lastDate = utils.addDays(slices[0].startDate, -1);
      let th = getColumnHeader("th");
      let div = getDiv();
      slices.forEach(slice => {
        const currentDate = new Date(slice.startDate);
        if (lastDate.getDate() !== currentDate.getDate()) {
          div = getDiv();
          th = getColumnHeader("th");
          th.setAttribute("colspan", 24 - currentDate.getHours());
          th.innerHTML = `<div class="header-hours">${currentDate.getDate() +
            1} ${currentDate.getMonth() +
            1} ${currentDate.getFullYear()}</div>`;
          th.appendChild(div);
          row.appendChild(th);
        }
        div.innerHTML += `<span class="slice header-hour">${currentDate.getHours() +
          1}</span>`;
        lastDate = currentDate;
      });
    }
  };
  export let getSlices = {
    year: (startDate, endDate) => {
      const _slices = [];
      let date = new Date(startDate.getFullYear(), 0, 1);
      const end = new Date(endDate.getFullYear(), 0, 1);

      while (date <= end) {
        const current = utils.addYears(date, 1);
        const _slice = {
          startDate: date.getTime(),
          endDate: new Date(current.getFullYear(), 12, 31).getTime()
        };
        _slices.push(formatSlice(_slice));
        date = current;
      }
      return _slices;
    },
    month: (startDate, endDate) => {
      const _slices = [];
      let date = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

      while (date <= end) {
        const current = utils.addMonths(date, 1);
        const _slice = {
          startDate: date.getTime(),
          endDate: new Date(
            current.getFullYear(),
            current.getMonth(),
            0
          ).getTime()
        };
        _slices.push(formatSlice(_slice));
        date = current;
      }
      return _slices;
    },
    day: (startDate, endDate) => {
      const _slices = [];
      let date = new Date(startDate);
      date.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);

      while (date <= end) {
        const current = utils.addDays(date, 1);
        const startTime = date.getTime();
        const _endDate = new Date(startTime);
        _endDate.setHours(23, 59, 59, 999);

        const _slice = {
          startDate: startTime,
          endDate: _endDate.getTime()
        };
        _slices.push(formatSlice(_slice));
        date = current;
      }
      return _slices;
    },
    hour: (startDate, endDate) => {
      const _slices = [];
      let date = new Date(startDate);
      date.setMinutes(0, 0, 0);
      const end = new Date(endDate);
      end.setMinutes(0, 0, 0);

      while (date <= end) {
        const current = utils.addHours(date, 1);
        const startTime = date.getTime();
        const _endDate = new Date(startTime);
        _endDate.setMinutes(59, 59, 999);

        const _slice = {
          startDate: startTime,
          endDate: _endDate.getTime()
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
  export let startDate;
  export let zoom;

  const dispatch = createEventDispatcher();
  let container;
  let cells;

  $: timezone = new Date(startDate).getTimezoneOffset() * 60 * 1000; //milliseconds
  $: slices = getSlices[zoom](new Date(startDate), new Date(endDate));
  $: (cells = {}), zoom;

  function itemOnClick(e) {
    dispatch("click.item", e.detail);
  }

  function rowOnClick(e) {
    dispatch("click.row", e.detail);
  }

  export function getCoordinates(index, startDate, endDate) {
    const startDateWithTimezone = getRelativeDate[zoom](startDate);
    const endDateWithTimezone = getRelativeDate[zoom](endDate);

    const startCell = cells[`${index},${startDateWithTimezone}`];
    const endCell = cells[`${index},${endDateWithTimezone}`];

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
    border: 1px solid black;
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

  :global(.container-m) {
    flex: 1;
    display: flex;
  }

  :global(.container-x) {
    flex: 1;
  }

  :global(.grupo) {
    flex-grow: 1;
    display: flex;
  }

  :global(.titulo) {
    display: flex;
  }

  :global(.item) {
    flex: 1;
    border: 1px solid black;
    width: 0;
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
          {timezone}
          {zoom}
          on:click={rowOnClick} />
      {/each}
    </tbody>
  </table>

  <!-- {#each rows as row, index (row)}
    <Item
      {container}
      {index}
      {getCoordinates}
      {getRelativeDate}
      {row}
      {slices}
      {timezone}
      {zoom}
      on:click={itemOnClick} />
  {/each} -->
</div>
