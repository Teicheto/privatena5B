let highScore = localStorage.getItem('pingPongHighScore') || 0;
highScoreDisplay.textContent = `Рекорд: ${highScore}`;

// Когато постигнем нов рекорд, съхраняваме го с новия ключ
if (score > highScore) {
    highScore = score;
    localStorage.setItem('pingPongHighScore', highScore);
    highScoreDisplay.textContent = `Рекорд: ${highScore}`;
}
resetButton.addEventListener('click', () => {
    highScore = 0;
    localStorage.setItem('pingPongHighScore', highScore);
    highScoreDisplay.textContent = `Рекорд: ${highScore}`;
    alert("Рекордът е нулиран!");
});
