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

<div>
  {#each headers as header}
    <div
      on:click={e => onClickCell(e, header)}
      class:header-side={true}
      {...header}>
      <span class="content">
        {@html header.content}
      </span>
    </div>
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
