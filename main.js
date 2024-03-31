const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.reset');
const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message');

let isCurrentCircle = true;

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

cells.forEach((cell) => {
	cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
	const cell = e.target;
	const currentClass = isCurrentCircle ? 'circle' : 'x';
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		console.log('Winner');
		endGame();
	} else if (isDraw()) {
		console.log('Draw');
		endGame();
	} else {
		swapTurns();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function checkWin(currentClass) {
	return winningCombos.some((combo) => {
		return combo.every((index) => {
			return cells[index].classList.contains(currentClass);
		});
	});
}

function isDraw() {
	return [...cells].every((cell) => {
		return cell.classList.contains('circle') || cell.classList.contains('x');
	});
}

function swapTurns() {
	isCurrentCircle = !isCurrentCircle;
}

function endGame() {
	if (isDraw()) {
		message.innerText = 'Draw!';
	} else {
		message.innerText = isCurrentCircle ? 'O Wins!' : 'X Wins!';
	}
	overlay.classList.add('show');
}

restartButton.addEventListener('click', () => {
	overlay.classList.remove('show');
	cells.forEach((cell) => {
		cell.classList.remove('circle');
		cell.classList.remove('x');
		cell.addEventListener('click', handleClick, { once: true });
	});
});
