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
// Получаване на елементите от DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

// Добавяне на слушател на събития за бутона "Изпрати"
sendButton.addEventListener('click', function() {
    const message = messageInput.value.trim(); // Взима текста от входното поле и премахва излишните пробели

    if (message) { // Проверка дали съобщението не е празно
        // Създаване на ново съобщение
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message'; // Добавяне на клас за стилизиране
        messageDiv.textContent = message; // Задаване на текста на съобщението

        // Добавяне на съобщението в чата
        messagesDiv.appendChild(messageDiv);

        // Изчистване на входното поле
        messageInput.value = '';
        // Скролиране до най-новото съобщение
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});

// Добавяне на функция за изпращане с Enter
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Проверка дали натиснатият клавиш е Enter
        sendButton.click(); // Изпраща съобщението при натискане на Enter
    }
});
