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
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');

let score = 0;
let highScore = localStorage.getItem('circleGameHighScore') || 0;
let gameActive = false;
let gameInterval;

function startGame() {
    score = 0;
    scoreDisplay.textContent = `Точки: ${score} | Рекорд: ${highScore}`;
    gameActive = true;
    target.style.display = 'block';
    moveTarget();

    // Играта продължава 30 секунди
    gameInterval = setInterval(moveTarget, 1000);
    setTimeout(endGame, 30000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    target.style.display = 'none';

    // Проверка за нов най-добър резултат
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('circleGameHighScore', highScore);
        alert(`Ново най-добро! Твоите точки са: ${score}`);
    } else {
        alert(`Играта приключи! Твоите точки са: ${score}`);
    }
    scoreDisplay.textContent = `Точки: ${score} | Рекорд: ${highScore}`;
}

function moveTarget() {
    const x = Math.random() * (gameContainer.clientWidth - 50);
    const y = Math.random() * (gameContainer.clientHeight - 50);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

target.addEventListener('click', () => {
    if (gameActive) {
        score++;
        scoreDisplay.textContent = `Точки: ${score} | Рекорд: ${highScore}`;
        moveTarget();
    }
});

startButton.addEventListener('click', startGame);
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    health: 100,
    magic: 50
};

function drawPlayer() {
    ctx.fillStyle = "#00ff7f";
    ctx.beginPath();
    ctx.arc(player.x, player.y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function updateStats() {
    document.getElementById("health").textContent = player.health;
    document.getElementById("magic").textContent = player.magic;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    updateStats();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    const speed = 5;
    if (event.key === "ArrowUp") player.y -= speed;
    if (event.key === "ArrowDown") player.y += speed;
    if (event.key === "ArrowLeft") player.x -= speed;
    if (event.key === "ArrowRight") player.x += speed;
});

gameLoop();
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// За да можем да четем JSON данни от POST заявки
app.use(express.json());

// Четене на продуктите
app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Грешка при четене на продуктите');
        }
        res.send(JSON.parse(data));
    });
});

// Добавяне на нов продукт
app.post('/add-product', (req, res) => {
    const newProduct = req.body;

    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Грешка при четене на продуктите');
        }

        const products = JSON.parse(data);
        products.push(newProduct);

        fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Грешка при записване на продукта');
            }
            res.send('Продуктът е добавен успешно!');
        });
    });
});

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Сървърът е стартиран на http://localhost:${PORT}`);
});
