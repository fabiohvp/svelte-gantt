export default function scroll(node, slider) {
	if (!slider) {
		slider = window;
	}

	var curXPos = 0,
		curDown = false;

	function onMouseMove(e) {
		if (curDown === true) {
			slider.scrollTo(slider.scrollX + (curXPos - e.pageX), slider.scrollY);
		}
	}

	function onMouseDown(e) {
		curDown = true;
		curXPos = e.pageX;
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