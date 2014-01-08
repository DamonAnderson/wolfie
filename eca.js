var d = document, c = d.getElementById('view'),
	q = c.getContext('2d'),
	CELL_SIZE = 1,
	BOARD_WIDTH = c.width / CELL_SIZE,
	BOARD_HEIGHT = c.height / CELL_SIZE,
	arrayA, arrayB, rule;

function initArrays() {
	arrayA = [];arrayB = [];
	for (var i=0;i<BOARD_WIDTH;i++) {
		arrayA.push(0);
		arrayB.push(0);
	}
	arrayA[Math.floor(BOARD_WIDTH/2)] = 1;
}

function updateRow() {
	for (var i=0;i<BOARD_WIDTH;i++) {
		arrayB[i] = transition(i);
	}
	tmp = arrayB;
	arrayB = arrayA;
	arrayA = tmp;
}

function strInt(s) {
	var result = 0;
	for (var i=0,l=s.length;i<l;i++) {
		result = 10*result + s[i].charCodeAt() - 48;
	}
	return result;
}

function transition(i) {
	var lf = (i==0) ? 0 : arrayA[i-1],
		rt = (i==BOARD_WIDTH-1) ? 0 : arrayA[i+1],
		val = 4*lf + 2*arrayA[i] + rt;
	return (rule & 1<<val) ? 1 : 0;
}

function drawBoard() {
	q.strokeStyle = '#000';
	q.lineWidth = 0.5;
	q.fillStyle = '#000';
	q.clearRect(0,0,c.width,c.height);
	for (var i=0;i<BOARD_SIZE;i++) {
		for (var j=0;j<BOARD_SIZE;j++) {
			q.strokeRect(CELL_SIZE*j,CELL_SIZE*i,CELL_SIZE,CELL_SIZE);
			if (board[i][j] == 1) {
				q.fillRect(CELL_SIZE*j,CELL_SIZE*i,CELL_SIZE,CELL_SIZE);
			}
		}
	}
}

d.getElementById('generate').onmouseup = function() {
	rule = strInt(d.getElementById('rule').value);
	q.strokeStyle = '#000';
	q.lineWidth = 0.1;
	q.fillStyle = '#000';
	q.clearRect(0,0,c.width,c.height);
	initArrays();
	for (var k=0;k<BOARD_HEIGHT;k++) {
		// Draw current row
		for (var j=0;j<BOARD_WIDTH;j++) {
		//	q.strokeRect(CELL_SIZE*j,CELL_SIZE*k,CELL_SIZE,CELL_SIZE);
			if (arrayA[j] == 1) {
				q.fillRect(CELL_SIZE*j,CELL_SIZE*k,CELL_SIZE,CELL_SIZE);
			}
		}
		updateRow();
	}
};

c.onmouseup = function(e) {
	var x = Math.floor((e.pageX-c.offsetLeft)/CELL_SIZE),
		y = Math.floor((e.pageY-c.offsetTop)/CELL_SIZE);
};

initArrays();
