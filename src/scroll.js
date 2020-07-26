export default function scroll(
  node,
  { slider, directions, behavior, moveIntervalTimeout },
) {
  let propertyX = "scrollLeft";
  let propertyY = "scrollTop";
  let curXPos = 0;
  let curYPos = 0;
  let curDown = false;
  let moveInterval;
  let movingElement;
  let updateScrollPosition = true;

  const _directions = {
    x: (e) => {
      slider.scrollTo({
        left: slider[propertyX] + (curXPos - e.pageX),
        top: slider[propertyY],
        behavior,
      });
    },
    y: (e) =>
      slider.scrollTo({
        left: slider[propertyX],
        top: slider[propertyY] + (curYPos - e.pageY),
        behavior,
      }),
  };

  if (!slider || slider === window) {
    propertyX = "scrollX";
    propertyY = "scrollY";
    slider = window;
  }

  function onMovingElementClick(e) {
    e.preventDefault();
    e.stopPropagation();
    movingElement.removeEventListener("click", onMovingElementClick);
    movingElement.removeAttribute("moving");
  }

  function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    movingElement = e.target;
    curDown = true;
    curXPos = e.pageX;
    curYPos = e.pageY;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseEnd);

    moveInterval = setInterval(() => {
      updateScrollPosition = true;
    }, moveIntervalTimeout);
    return false;
  }

  function onMouseMove(e) {
    if (curDown === true) {
      movingElement.setAttribute("moving", true);
      e.preventDefault();

      if (updateScrollPosition) {
        directions.forEach((d) => _directions[d](e));
        updateScrollPosition = false;
      }
      return false;
    }
  }

  function onMouseEnd(e) {
    clearInterval(moveInterval);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseEnd);

    if (curDown) {
      if (movingElement.getAttribute("moving") === "true") {
        movingElement.addEventListener("click", onMovingElementClick);
      }
      e.preventDefault();
      e.stopPropagation();
      curDown = false;
      return false;
    }
  }

  node.addEventListener("mousedown", onMouseDown);

  return {
    update({ slider: newSlider, directions: newDirections }) {
      if (!newSlider) {
        newSlider = window;
      }

      if (!newDirections) {
        directions = newDirections;
      }

      slider = newSlider;
    },
    destroy() {
      node.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseEnd);
    },
  };
}
