# svelte-gantt

Gantt component made with svelte. The main reason is to provide an easy and very customazible component.
Overriding the default getHeader and getSlices methods it is possible to format your Gantt chart the way you need. By default it has four renderings modes: hour, day, month and year.
Also almost every element has it's own class and it is made this way to be easy to change the layout the way you need it.

**PS1**: this component does not use virtual rendering, this means that it will render every cell on load. Be careful with the matrix size you are generating ((endTime - startTime) / zoom) * rows.

**PS2**: events: there are only two, load (will be triggered after the component is loaded and painted) and click (will be fired when click on elements like header, cell, sideMenu, this can be checked on the event property: type).

`npm install @fabiohvp/svelte-gantt`  
or  
`yarn add @fabiohvp/svelte-gantt`

## Example

https://svelte.dev/repl/870fd9529ba54d71a2aaaa87c8876e24?version=3.24.0
