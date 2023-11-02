let currentFold = [1,1];
let body = document.querySelector('body');
let container = document.querySelector('.container');
let arrUp = document.querySelector('.arr-up');
let arrRight = document.querySelector('.arr-right');
let arrDown = document.querySelector('.arr-down');
let arrLeft = document.querySelector('.arr-left');
let map = document.querySelector('.map');
let mapImg = map.querySelector('img');
let wait = false;
function move(dir) {

	if (wait == true) {
		return;
	}

	// Bounds
	if (dir == 'up' && currentFold[1] == 1) {
		return
	} else if (dir == 'right' && currentFold[0] == 4) {
		return
	} else if (dir == 'down' && currentFold[1] == 8) {
		return
	} else if (dir == 'left' && currentFold[0] == 1) {
		return
	}

	arrUp.dataset.active = 0;
	arrRight.dataset.active = 0;
	arrDown.dataset.active = 0;
	arrLeft.dataset.active = 0;
	body.dataset.wait = 1;
	wait = true;
	let oldMap = document.querySelector('#map'+currentFold[0]+"-"+currentFold[1]);
	if (dir == 'up') {
		currentFold = [currentFold[0], currentFold[1]-1];
		let newMap = document.querySelector('#map'+currentFold[0]+"-"+currentFold[1]);
		oldMap.style.transformOrigin = `top`;
		oldMap.style.transform = `translate(-50%, 50%)`;
		newMap.style.transformOrigin = `bottom`;
		newMap.style.transform = `translate(-50%, -50%) scaleY(0)`;
		newMap.dataset.reset = 1;
		setTimeout(() => {
			newMap.dataset.reset = 0;
			newMap.dataset.active = 1;
		}, 50)
		setTimeout(() => {
			oldMap.style.transform = `translate(-50%, 50%) scaleY(0)`;
			oldMap.style.transform = `translate(-50%, 50%)`;
			newMap.style.transform = `translate(-50%, -50%) scaleY(1)`;
		}, 300);
		setTimeout(() => {
			oldMap.style.transform = `translate(-50%, 50%) scaleY(0)`;
		}, 600);
	} else if (dir == 'right') {
		currentFold = [currentFold[0]+1, currentFold[1]];
		let newMap = document.querySelector('#map'+currentFold[0]+"-"+currentFold[1]);
		oldMap.style.transformOrigin = `right`;
		oldMap.style.transform = `translate(-150%, -50%)`;
		newMap.style.transformOrigin = `left`;
		newMap.style.transform = `translate(-50%, -50%) scaleX(0)`;
		newMap.dataset.reset = 1;
		setTimeout(() => {
			newMap.dataset.reset = 0;
			newMap.dataset.active = 1;
		}, 50)
		setTimeout(() => {
			oldMap.style.transform = `translate(-150%, -50%) scaleX(0)`;
			oldMap.style.transform = `translate(-150%, -50%)`;
			newMap.style.transform = `translate(-50%, -50%) scaleX(1)`;
		}, 300);
		setTimeout(() => {
			oldMap.style.transform = `translate(-150%, -50%) scaleX(0)`;
		}, 600);
	} else if (dir == 'down') {
		currentFold = [currentFold[0], currentFold[1]+1];
		let newMap = document.querySelector('#map'+currentFold[0]+"-"+currentFold[1]);
		oldMap.style.transformOrigin = `bottom`;
		oldMap.style.transform = `translate(-50%, -150%)`;
		newMap.style.transformOrigin = `top`;
		newMap.style.transform = `translate(-50%, -50%) scaleY(0)`;
		newMap.dataset.reset = 1;
		setTimeout(() => {
			newMap.dataset.reset = 0;
			newMap.dataset.active = 1;
		}, 50)
		setTimeout(() => {
			oldMap.style.transform = `translate(-50%, -150%) scaleY(0)`;
			oldMap.style.transform = `translate(-50%, -150%)`;
			newMap.style.transform = `translate(-50%, -50%) scaleY(1)`;
		}, 300);
		setTimeout(() => {
			oldMap.style.transform = `translate(-50%, -150%) scaleY(0)`;
		}, 600);
	} else if (dir == 'left') {
		currentFold = [currentFold[0]-1, currentFold[1]];
		let newMap = document.querySelector('#map'+currentFold[0]+"-"+currentFold[1]);
		oldMap.style.transformOrigin = `left`;
		oldMap.style.transform = `translate(50%, -50%)`;
		newMap.style.transformOrigin = `right`;
		newMap.style.transform = `translate(-50%, -50%) scaleX(0)`;
		newMap.dataset.reset = 1;
		setTimeout(() => {
			newMap.dataset.reset = 0;
			newMap.dataset.active = 1;
		}, 50)
		setTimeout(() => {
			oldMap.style.transform = `translate(50%, -50%) scaleX(0)`;
			oldMap.style.transform = `translate(50%, -50%)`;
			newMap.style.transform = `translate(-50%, -50%) scaleX(1)`;
		}, 300);
		setTimeout(() => {
			oldMap.style.transform = `translate(50%, -50%) scaleX(0)`;
		}, 600);
	}

	if (currentFold[1] == 1) {
		arrUp.dataset.active = 0;
	} else {
		arrUp.dataset.active = 1;
	}

	if (currentFold[0] == 4) {
		arrRight.dataset.active = 0;
	} else {
		arrRight.dataset.active = 1;
	}

	if (currentFold[1] == 8) {
		arrDown.dataset.active = 0;
	} else {
		arrDown.dataset.active = 1;
	}

	if (currentFold[0] == 1) {
		arrLeft.dataset.active = 0;
	} else {
		arrLeft.dataset.active = 1;
	}

	// Set active cell on chart
	for (let chartCell of document.querySelectorAll('.chart-cell')) {
		chartCell.dataset.active = 0;
	}
	let activeCell = document.querySelector('#chart'+currentFold[0]+"-"+currentFold[1]);
	activeCell.dataset.active = 1;

	setTimeout(() => {
		oldMap.dataset.active = 0;
		wait = false;
		body.dataset.wait = 0;
	}, 900)
}

// Automatically move to cell
function toggleChart() {
	if (parseInt(container.dataset.chart) == 1) {
		container.dataset.chart = 0;
	} else {
		container.dataset.chart = 1;
	}
}
function closeChart() {
	container.dataset.chart = 0;
}
function moveToCell(col, row) {
	closeChart();
	if (col > currentFold[0]) {
		move('right');
		setTimeout(() => {moveToCell(col, row)}, 910);
	} else if (col < currentFold[0]) {
		move('left');
		setTimeout(() => {moveToCell(col, row)}, 910);
	} else if (row < currentFold[1]) {
		move('up');
		setTimeout(() => {moveToCell(col, row)}, 910);
	} else if (row > currentFold[1]) {
		move('down');
		setTimeout(() => {moveToCell(col, row)}, 910);
	}
}

// Keyboard input
body.addEventListener('keydown', detectKey);
function detectKey(e) {
	if (e.key == 'ArrowUp' || e.key == "w" || e.key == "W") {
		move(fixDirection('up'));
	} else if (e.key == 'ArrowRight' || e.key == "d" || e.key == "D") {
		move(fixDirection('right'));
	} else if (e.key == 'ArrowDown' || e.key == "s" || e.key == "S") {
		move(fixDirection('down'));
	} else if (e.key == 'ArrowLeft' || e.key == "a" || e.key == "A") {
		move(fixDirection('left'));
	}
}

// Rotate everything
let mapImgs = document.querySelector('.map-imgs');
let chart = document.querySelector('.chart');
let rotation = 0;
let bodyRotation = 0;
function rotate(dir) {
	if (dir == 'left') {
		rotation -= 90;
		bodyRotation++;
	} else if (dir == 'right') {
		rotation += 90;
		bodyRotation--;
	}

	if (bodyRotation == 4) {
		bodyRotation = 0
	} else if (bodyRotation < 0) {
		bodyRotation = 3;
	}
	body.dataset.rotation = bodyRotation;
	mapImgs.style.transform = `rotate(${rotation}deg)`;
	chart.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

function fixDirection(dir) {
	if (bodyRotation == 3) {
		switch (dir) {
			case 'left': dir = 'down'; break;
			case 'up': dir = 'left'; break;
			case 'right': dir = 'up'; break;
			case 'down': dir = 'right'; break;
			default: break;
		}
	} else if (bodyRotation == 2) {
		switch (dir) {
			case 'left': dir = 'right'; break;
			case 'up': dir = 'down'; break;
			case 'right': dir = 'left'; break;
			case 'down': dir = 'up'; break;
			default: break;
		}
	} else if (bodyRotation == 1) {
		switch (dir) {
			case 'left': dir = 'up'; break;
			case 'up': dir = 'right'; break;
			case 'right': dir = 'down'; break;
			case 'down': dir = 'left'; break;
			default: break;
		}
	}
	return dir
}