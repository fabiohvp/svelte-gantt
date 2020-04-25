<script>
  export let columns;
  export let headers;
  export let slices;
  export let slicesCount;
  export let slicesSize;
  export let zoom;

  function getGroupsDays(columns) {
    const groups = [];
    let currentGroup;
    let currentMonth = -1;

    columns.forEach(column => {
      const month = column.date.getMonth();

      if (month !== currentMonth) {
        currentGroup = {
          colspan: 1,
          month,
          date: column.date
        };

        groups.push(currentGroup);
        currentMonth = month;
      } else {
        currentGroup.colspan++;
      }
    });

    return groups;
  }
</script>

{@html headers(columns, slices, slicesCount, slicesSize, zoom)}

<!-- <tr class="row">
  {#each row.headers as header}
    <th
      class:column={true}
      class:header={true}
      on:click={() => (row.expanded = !row.expanded)}
      {...header}>
      <div class="column header">
        {@html header.content || ''}
      </div>
    </th>
  {/each}

  {#each columns as column}
    <th
      class="column value"
      startDate={column.startDate}
      endDate={column.endDate}>
      <div class="column slices">
      </div>
    </th>
  {/each}
</tr> -->
