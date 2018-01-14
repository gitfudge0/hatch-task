// INIT VARIABLES
let container = document.getElementById("container");
let mainContent = document.getElementById("mainContent");
let transformDistance = 0;
let isMenuOpen = false;
let contentChildernCount = mainContent.childElementCount;

// CONFIGS
var mc = new Hammer.Manager(container, {
	recognizers: [
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
	]
});

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);


// FUNCTIONS

/**
 * Changes the distance to be transformed
 * @param {int} val 
 * @param {int} direction 
 */
const changeDistance = (val, direction = -1, distance = 200) => {
    val = val + (direction * distance);
    if(val > 0) {
        return 0
    } else if(val < 0 && val < (-1 * container.offsetWidth * contentChildernCount + container.offsetWidth)) {
        return -1 * container.offsetWidth * contentChildernCount + container.offsetWidth
    } else {
        return val;
    }
}

/**
 * Toggle menu
 */
const toggleMenu = () => {
    let menuEl = document.getElementById("menu");
    if(isMenuOpen) {
        menuEl.style.display = "none";
    } else {
        menuEl.style.display = "block";
    }
    isMenuOpen = !isMenuOpen;
}

/**
 * Mouse scroll handler
 * @param {event} e 
 */
const MouseWheelHandler = (e) => {
    let wheelDelta = -e.wheelDelta || e.detail;
    if(wheelDelta > 0) {
        transformDistance = changeDistance(transformDistance);
    } else {
        transformDistance = changeDistance(transformDistance, 1);
    }
    mainContent.style.transform = "translateX(" + transformDistance + "px)"
}


mc.on("swipe", function(ev) {
    if(ev.direction == 4) {
        transformDistance = changeDistance(transformDistance, 1, container.offsetWidth);
    } else if(ev.direction == 2) {
        transformDistance = changeDistance(transformDistance, -1, container.offsetWidth);
    }
    mainContent.style.transform = "translateX(" + transformDistance + "px)"
})



if (container.addEventListener) {
	container.addEventListener("mousewheel", MouseWheelHandler, false);
    container.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}