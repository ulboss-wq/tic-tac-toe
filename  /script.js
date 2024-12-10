let counter = 0; // Счётчик ходов
let currentPlayer = 'X'; // По умолчанию начинает X
let scoreX = 0; // Счёт игрока X
let scoreO = 0; // Счёт игрока O

const cells = document.querySelectorAll('#field td');
const header = document.getElementById('header');
const scoreboard = document.getElementById('scoreboard'); // Элемент для отображения счета

function isVictory() {
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of combos) {
        if (
            cells[combo[0]].innerHTML === cells[combo[1]].innerHTML &&
            cells[combo[1]].innerHTML === cells[combo[2]].innerHTML &&
            cells[combo[0]].innerHTML !== ''
        ) {
            return combo; // Возвращаем выигрышную комбинацию
        }
    }
    return null; // Если победы нет, возвращаем null
}

function highlightWinningCombo(combo) {
    for (const index of combo) {
        cells[index].style.backgroundColor = '#014421'; // Зеленый фон
    }
}

function tap(event) {
    event.target.innerHTML = `<img src="${currentPlayer === 'X' ? 'close (1).png' : 'o.png'}" width=100>`;

    const winningCombo = isVictory(); // Проверяем победу

    if (winningCombo) {
        for (const cell of cells) {
            cell.removeEventListener('click', tap); // Отключаем клики
        }

        highlightWinningCombo(winningCombo); // Подсвечиваем победную линию

        if (currentPlayer === 'X') {
            scoreX++;
            alert('🎉 Player X wins!'); // Показываем уведомление
            header.innerText = 'X is winner';
        } else {
            scoreO++;
            alert('🎉 Player O wins!'); // Показываем уведомление
            header.innerText = 'O is winner';
        }

        updateScoreboard(); // Обновляем счёт
    } else if (counter === 8) {
        alert('🤝 It\'s a draw!'); // Уведомление о ничьей
        header.innerText = 'Draw!';
    }

    counter++;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Меняем игрока
    event.target.removeEventListener('click', tap); // Запрещаем повторный клик
}

function startGame() {
    header.innerText = 'Tic Tac Toe';
    counter = 0;

    for (const cell of cells) {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Сбрасываем фон
        cell.addEventListener('click', tap);
    }
}

function updateScoreboard() {
    scoreboard.innerText = `Score - X: ${scoreX} | O: ${scoreO}`;
}

function choosePlayer(player) {
    currentPlayer = player;
    startGame();
}

startGame();
