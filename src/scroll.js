export default function scroll(node, { slider, directions }) {
	let propertyX = "scrollLeft";
	let propertyY = "scrollTop";
	let curXPos = 0;
	let curYPos = 0;
	let curDown = false;

	const _directions = {
		x: (e) => slider.scrollTo(slider[propertyX] + (curXPos - e.pageX), slider[propertyY]),
		y: (e) => slider.scrollTo(slider[propertyX], slider[propertyY] + (curYPos - e.pageY))
	}

	if (!slider) {
		propertyX = "scrollX";
		propertyY = "scrollY";
		slider = window;
	}

	function onMouseMove(e) {
		if (curDown === true) {
			directions.forEach(d => _directions[d](e));
		}
	}

	function onMouseDown(e) {
		curDown = true;
		curXPos = e.pageX;
		curYPos = e.pageY;
	}

	function onMouseEnd(e) {
		curDown = false;
	}

	node.addEventListener('mousedown', onMouseDown);
	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseup', onMouseEnd);
	node.addEventListener('mouseleave', onMouseEnd);

	return {
		update(newSlider) {
			if (!newSlider) {
				newSlider = window;
			}

			slider = newSlider;
		},
		destroy() {
			node.removeEventListener('mousedown', onMouseDown);
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseleave', onMouseEnd);
			node.removeEventListener('mouseleave', onMouseEnd);
		}
	};
}