# svelte-gantt

Gantt component made with svelte. The main reason is to provide an easy and very customazible component.
Overriding the default getHeader and getSlices methods it is possible to format your Gantt chart the way you need. By default it has four renderings modes: hour, day, month and year.
Also almost every element has it's own class and it is made this way to be easy to change the layout the way you need it.

**PS1**: this component does not use virtual rendering, this means that it will render every cell on load. Be careful with the matrix size you are generating ((endTime - startTime) / zoom).

**PS2**: events: there are only two, load (will be triggered after the component is loaded and painted) and click (will be fired when click on elements like header, cell, sideMenu, this can be checked on the event property: type).

`npm install @fabiohvp/svelte-gantt`  
or  
`yarn add @fabiohvp/svelte-gantt`

## Example

some variables for both examples
```
	const zoom = "day";
	const padding = 365; //2 years using zoom = "day"
	const today = new Date();
	const rows = getRows(); //generated dummy data

	let startTime = utils.addDays(today, -padding);
	startTime = startTime.getTime();

	let endTime = utils.addDays(today, padding);
	endTime = endTime.getTime();
```

using svelte
```
import Gantt from "@fabiohvp/svelte-gantt";
<Gantt {startTime} {endTime} {rows} {zoom} on:click={console.log} on:load={() => console.log("loaded")} />
```
or as exported js component
```
	<div id="test"></div>

	const gantt = new Gantt({
		target: document.getElementById("test"),
		props: {
			startTime,
			endTime,
			rows,
			zoom,
			//scrollBehavior: "smooth"
			//slider: document.getElementById("wrapper")
		},
	});

	gantt.$on("click", console.log);
	gantt.$on("load", () => {
		gantt.goto(initialDate, "smooth");
		
		//coloring the column
		const relativeDate = gantt.getRelativeDate(initialDate);
		const slices = document.querySelectorAll(`.slice[starttime="${relativeDate}"]`);
		Array.from(slices).slice(1).forEach(s => s.classList.add("goto"));
	});

	function getRows() {
		return [{
			"headers":[
				{
					"title":"Row 0",
					"content":" Row 0"
				}
			],
			"items":[
				{
					"content":"Item 0: 0",
					"title":"Item 0: 0",
					"class":"odd",
					"startTime":"2019-09-15T10:00:00.000Z",
					"endTime":"2019-12-13T17:00:00.000Z"
				},
				{
					"content":"Item 0: 1",
					"title":"Item 0: 1",
					"class":"odd",
					"startTime":"2020-02-12T08:00:00.000Z",
					"endTime":"2020-08-28T14:00:00.000Z"
				}
			],
			"expanded":false,
			"children":[

			]
		},
		{
			"headers":[
				{
					"title":"Row 1",
					"content":" Row 1"
				}
			],
			"items":[
				{
					"content":"Item 1: 0",
					"title":"Item 1: 0",
					"class":"even",
					"startTime":"2020-10-09T04:00:00.000Z",
					"endTime":"2020-11-25T06:00:00.000Z"
				}
			],
			"expanded":false,
			"children":[
				{
					"headers":[
						{
							"title":"Row 1-0",
							"content":"&nbsp;&nbsp; Row 1-0"
						}
					],
					"items":[
						{
							"content":"Item 1-0: 0",
							"title":"Item 1-0: 0",
							"class":"odd",
							"startTime":"2021-01-18T05:00:00.000Z",
							"endTime":"2021-02-04T12:00:00.000Z"
						},
						{
							"content":"Item 1-0: 1",
							"title":"Item 1-0: 1",
							"class":"odd",
							"startTime":"2020-02-07T15:00:00.000Z",
							"endTime":"2020-09-19T18:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[

					]
				},
				{
					"headers":[
						{
							"title":"Row 1-1",
							"content":"&nbsp;&nbsp; Row 1-1"
						}
					],
					"items":[
						{
							"content":"Item 1-1: 0",
							"title":"Item 1-1: 0",
							"class":"odd",
							"startTime":"2019-11-10T05:00:00.000Z",
							"endTime":"2021-04-02T12:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[
						{
							"headers":[
								{
									"title":"Row 1-1-0",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 1-1-0"
								}
							],
							"items":[
								{
									"content":"Item 1-1-0: 0",
									"title":"Item 1-1-0: 0",
									"class":"odd",
									"startTime":"2019-12-22T05:00:00.000Z",
									"endTime":"2020-10-15T12:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						},
						{
							"headers":[
								{
									"title":"Row 1-1-1",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 1-1-1"
								}
							],
							"items":[
								{
									"content":"Item 1-1-1: 0",
									"title":"Item 1-1-1: 0",
									"class":"odd",
									"startTime":"2019-09-08T10:00:00.000Z",
									"endTime":"2021-06-14T06:00:00.000Z"
								},
								{
									"content":"Item 1-1-1: 1",
									"title":"Item 1-1-1: 1",
									"class":"odd",
									"startTime":"2020-06-17T15:00:00.000Z",
									"endTime":"2020-10-04T17:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						},
						{
							"headers":[
								{
									"title":"Row 1-1-2",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 1-1-2"
								}
							],
							"items":[
								{
									"content":"Item 1-1-2: 0",
									"title":"Item 1-1-2: 0",
									"class":"odd",
									"startTime":"2021-05-17T03:00:00.000Z",
									"endTime":"2021-07-16T04:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						}
					]
				},
				{
					"headers":[
						{
							"title":"Row 1-2",
							"content":"&nbsp;&nbsp; Row 1-2"
						}
					],
					"items":[
						{
							"content":"Item 1-2: 0",
							"title":"Item 1-2: 0",
							"class":"odd",
							"startTime":"2021-05-01T21:00:00.000Z",
							"endTime":"2021-07-10T10:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[

					]
				}
			]
		},
		{
			"headers":[
				{
					"title":"Row 2",
					"content":" Row 2"
				}
			],
			"items":[
				{
					"content":"Item 2: 0",
					"title":"Item 2: 0",
					"class":"odd",
					"startTime":"2020-09-30T01:00:00.000Z",
					"endTime":"2021-04-29T15:00:00.000Z"
				}
			],
			"expanded":false,
			"children":[

			]
		},
		{
			"headers":[
				{
					"title":"Row 3",
					"content":" Row 3"
				}
			],
			"items":[
				{
					"content":"Item 3: 0",
					"title":"Item 3: 0",
					"class":"even",
					"startTime":"2020-12-27T02:00:00.000Z",
					"endTime":"2021-01-01T02:00:00.000Z"
				}
			],
			"expanded":false,
			"children":[
				{
					"headers":[
						{
							"title":"Row 3-0",
							"content":"&nbsp;&nbsp; Row 3-0"
						}
					],
					"items":[
						{
							"content":"Item 3-0: 0",
							"title":"Item 3-0: 0",
							"class":"odd",
							"startTime":"2019-08-21T16:00:00.000Z",
							"endTime":"2021-04-30T18:00:00.000Z"
						},
						{
							"content":"Item 3-0: 1",
							"title":"Item 3-0: 1",
							"class":"odd",
							"startTime":"2021-02-05T13:00:00.000Z",
							"endTime":"2021-03-13T19:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[

					]
				},
				{
					"headers":[
						{
							"title":"Row 3-1",
							"content":"&nbsp;&nbsp; Row 3-1"
						}
					],
					"items":[
						{
							"content":"Item 3-1: 0",
							"title":"Item 3-1: 0",
							"class":"odd",
							"startTime":"2021-02-11T18:00:00.000Z",
							"endTime":"2021-02-12T21:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[
						{
							"headers":[
								{
									"title":"Row 3-1-0",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 3-1-0"
								}
							],
							"items":[
								{
									"content":"Item 3-1-0: 0",
									"title":"Item 3-1-0: 0",
									"class":"odd",
									"startTime":"2019-12-18T17:00:00.000Z",
									"endTime":"2020-07-30T15:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						},
						{
							"headers":[
								{
									"title":"Row 3-1-1",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 3-1-1"
								}
							],
							"items":[
								{
									"content":"Item 3-1-1: 0",
									"title":"Item 3-1-1: 0",
									"class":"odd",
									"startTime":"2021-05-31T08:00:00.000Z",
									"endTime":"2021-06-05T00:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						},
						{
							"headers":[
								{
									"title":"Row 3-1-2",
									"content":"&nbsp;&nbsp;&nbsp;&nbsp; Row 3-1-2"
								}
							],
							"items":[
								{
									"content":"Item 3-1-2: 0",
									"title":"Item 3-1-2: 0",
									"class":"odd",
									"startTime":"2021-03-27T14:00:00.000Z",
									"endTime":"2021-06-25T09:00:00.000Z"
								},
								{
									"content":"Item 3-1-2: 1",
									"title":"Item 3-1-2: 1",
									"class":"odd",
									"startTime":"2020-11-28T16:00:00.000Z",
									"endTime":"2021-04-25T14:00:00.000Z"
								}
							],
							"expanded":false,
							"children":[

							]
						}
					]
				},
				{
					"headers":[
						{
							"title":"Row 3-2",
							"content":"&nbsp;&nbsp; Row 3-2"
						}
					],
					"items":[
						{
							"content":"Item 3-2: 0",
							"title":"Item 3-2: 0",
							"class":"odd",
							"startTime":"2020-09-24T21:00:00.000Z",
							"endTime":"2021-07-15T17:00:00.000Z"
						}
					],
					"expanded":false,
					"children":[

					]
				}
			]
		},
		{
			"headers":[
				{
					"title":"Row 4",
					"content":" Row 4"
				}
			],
			"items":[
				{
					"content":"Item 4: 0",
					"title":"Item 4: 0",
					"class":"odd",
					"startTime":"2020-10-27T00:00:00.000Z",
					"endTime":"2021-07-11T06:00:00.000Z"
				},
				{
					"content":"Item 4: 1",
					"title":"Item 4: 1",
					"class":"odd",
					"startTime":"2020-02-16T00:00:00.000Z",
					"endTime":"2020-04-27T03:00:00.000Z"
				}
			],
			"expanded":false,
			"children":[

			]
		}];
	}
```
