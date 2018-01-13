let myDiv = document.getElementById("myDiv");
var mc = new Hammer.Manager(myDiv, {
	recognizers: [
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
	]
});
let transformDistance = 0;

const changeDistance = (val, direction = -1) => {
    val = val + (direction * 100);
    console.log(val)
    if(val > 0) {
        return 0
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
    myDiv.style.transform = "translateX(" + transformDistance + "px)"
})


const MouseWheelHandler = (e) => {
    if(e.wheelDelta < 0) {
        transformDistance = changeDistance(transformDistance);
    } else {
        transformDistance = changeDistance(transformDistance, 1);
    }
    myDiv.style.transform = "translateX(" + transformDistance + "px)"
}


if (myDiv.addEventListener) {
	myDiv.addEventListener("mousewheel", MouseWheelHandler, false);
    myDiv.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}