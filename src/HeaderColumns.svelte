<script>
  import { createEventDispatcher } from "svelte";
  export let headers;
  export let row;

  const dispatch = createEventDispatcher();

  function onClickCell(e, header) {
    row.expanded = !row.expanded;
    dispatch("click", {
      event: e,
      header,
      type: "static"
    });
  }

  function onClickChildren(e) {
    dispatch("click", e.detail);
  }
</script>

<div class="row-height header-side-column">
  {#each headers as header}
    <span
      on:click={e => onClickCell(e, header)}
      class:align-center={true}
      class:slice={true}
      {...header}>
      <span class="content">
        {@html header.content}
      </span>
    </span>
  {/each}
</div>

{#if row.expanded && row.children}
  {#each row.children as child (child)}
    <svelte:self
      bind:row={child}
      headers={child.headers}
      on:click={e => onClickChildren(e)} />
  {/each}
{/if}
