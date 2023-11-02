let body = document.querySelector('body');
let container = document.querySelector('.container');
let content = document.querySelector('.content');
let root = document.querySelector(':root');

// Animate elements in and position them
let loop;
let target = [0,0];
let pos = [0, 0];
let modifier = 5;
container.addEventListener('mousemove', (e) => {setTarget(e)})

loop = setInterval(() => {
	let delta = [target[0] - pos[0], target[1] - pos[1]];
	pos[0] += delta[0]/modifier;
	pos[1] += delta[1]/modifier;
	content.style.transform = `translate(${-50*pos[0]}%, ${-50*pos[1]}%)`
}, 10)

function setTarget(e) {
	target = [(e.clientX/window.innerWidth)*2-1, (e.clientY/window.innerHeight)*2-1];
}

let crosshairX = document.querySelector('.crosshair-x');
let crosshairY = document.querySelector('.crosshair-y');
let cursor = document.querySelector('.cursor');
container.addEventListener('mousemove', (e) => {moveCrosshair(e)});
for (let link of document.querySelectorAll('.link')) {
	link.addEventListener("mouseenter", focusCrosshair);
	link.addEventListener("mouseleave", defocusCrosshair);
}
function moveCrosshair(e) {
	crosshairX.style.left = e.clientX + "px";
	crosshairX.style.top = e.clientY + "px";
	crosshairY.style.left = e.clientX + "px";
	crosshairY.style.top = e.clientY + "px";
}
function focusCrosshair() {
	crosshairX.dataset.focus = 1;
	crosshairY.dataset.focus = 1;
}
function defocusCrosshair() {
	crosshairX.dataset.focus = 0;
	crosshairY.dataset.focus = 0;
}

let zoom = 1;
body.addEventListener('wheel', changeZoom);
function changeZoom(e) {
	zoom -= e.deltaY*.001;
	if (zoom < .1) {
		zoom = .1;
	}
	root.style.setProperty('--zoom', zoom);
}