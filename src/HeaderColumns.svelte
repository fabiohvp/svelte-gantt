<script>
  import { createEventDispatcher } from "svelte";
  export let headers;
  export let row;

  const dispatch = createEventDispatcher();

  function onClickCell(e, header) {
    if (row.children.length > 0) {
      row.expanded = !row.expanded;
    }

    dispatch("click", {
      event: e,
      header,
      type: "static"
    });
  }

  function onClickChildren(e) {
    console.log("pq1p");
    dispatch("click", e.detail);
  }
</script>

<div class="row-height header-side-column">
  {#each headers as header}
    <span
      on:click={e => onClickCell(e, header)}
      class:align-center={true}
      class:has-child={row.children.length > 0}
      class:slice={true}
      {...header}>
      <span class="content">
        {@html header.content}
      </span>
    </span>
  {/each}
</div>

{#if row.expanded}
  {#each row.children as child (child)}
    <svelte:self
      bind:row={child}
      headers={child.headers}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
