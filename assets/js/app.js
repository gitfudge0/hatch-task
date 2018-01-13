// INIT VARIABLES
let container = document.getElementById("container");
let mainContent = document.getElementById("mainContent");
let transformDistance = 0;
var mc = new Hammer.Manager(container, {
	recognizers: [
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
	]
});


// FUNCTIONS

/**
 * Changes the distance to be transformed
 * @param {int} val 
 * @param {int} direction 
 */
const changeDistance = (val, direction = -1) => {
    val = val + (direction * 100);
    console.log(container.offsetWidth)
    console.log(val)
    if(val > 0) {
        return 0
    } else if(val < 0 && val < (-1 * container.offsetWidth * 4 + container.offsetWidth)) {
        console.log(-1 * container.offsetWidth * 4 + container.offsetWidth)
        return -1 * container.offsetWidth * 4 + container.offsetWidth
    } else {
        return val;
    }
}

mc.on("swipe", function(ev) {
    if(ev.direction == 4) {
        transformDistance = changeDistance(transformDistance, 1);
    } else if(ev.direction == 2) {
        transformDistance = changeDistance(transformDistance);
    }
    mainContent.style.transform = "translateX(" + transformDistance + "px)"
})


const MouseWheelHandler = (e) => {
    if(e.wheelDelta < 0) {
        transformDistance = changeDistance(transformDistance);
    } else {
        transformDistance = changeDistance(transformDistance, 1);
    }
    mainContent.style.transform = "translateX(" + transformDistance + "px)"
}


if (container.addEventListener) {
	container.addEventListener("mousewheel", MouseWheelHandler, false);
    container.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}