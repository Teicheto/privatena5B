// Пинг-Понг Игра

let score = 0; // Текущият резултат (може да бъде актуализиран от логиката на играта)
let highScore = localStorage.getItem('pingPongHighScore') || 0;
const highScoreDisplay = document.getElementById('highScoreDisplay');
const resetButton = document.getElementById('resetButton');

// Показване на рекорда
highScoreDisplay.textContent = `Рекорд: ${highScore}`;

// Функция за обновяване на резултата
function updateScore(newScore) {
    score = newScore; // Обновяване на текущия резултат
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('pingPongHighScore', highScore);
        highScoreDisplay.textContent = `Рекорд: ${highScore}`;
    }
}

// Слушател за бутона за нулиране
resetButton.addEventListener('click', () => {
    highScore = 0;
    localStorage.setItem('pingPongHighScore', highScore);
    highScoreDisplay.textContent = `Рекорд: ${highScore}`;
    alert("Рекордът е нулиран!");
});

// Коментари

// Функция за добавяне на коментар
function addComment() {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, comment });
        localStorage.setItem('comments', JSON.stringify(comments));

        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';

        displayComments();
    }
}

// Функция за показване на коментарите
function displayComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';

    comments.forEach((c) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `<strong>${c.name}</strong><p>${c.comment}</p>`;
        commentsDiv.appendChild(commentDiv);
    });
}

// Показване на коментарите при зареждане на страницата
displayComments();
