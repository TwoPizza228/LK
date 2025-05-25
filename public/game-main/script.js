// словарь цветов
const colorMap = {
  "красный": "red", "зелёный": "green", "синий": "blue", "жёлтый": "yellow",
  "оранжевый": "orange", "фиолетовый": "purple", "розовый": "pink", "коричневый": "brown",
  "голубой": "cyan", "серый": "gray"
};

const words = Object.keys(colorMap); // массив русских слов
const colors = Object.values(colorMap); // массив английских цветов

let currentWord = "", currentColor = "", score = 0, gameTimeLeft = 60;
let roundTimer, gameTimer, isGameActive = true;

// берем случайный элемент из массива
function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// отображаем новое слово на экране
function showNewWord() {
  if (!isGameActive) return;

  currentWord = getRandomItem(words);
  const shouldMatch = Math.random() < 0.5;
  currentColor = shouldMatch ? colorMap[currentWord] : getMismatchColor();

  document.getElementById("word").textContent = currentWord;
  document.getElementById("word").style.color = currentColor;
  document.getElementById("word").style.opacity = 0;
  setTimeout(() => document.getElementById("word").style.opacity = 1, 50);

  document.getElementById("result").textContent = "";
  startRoundTimer();
}

// генерируем цвет, который не соответствует текущему слову
function getMismatchColor() {
  let color;
  do { color = getRandomItem(colors); }
  while (color === colorMap[currentWord]);
  return color;
}

// таймер раунда на 10 секунд
function startRoundTimer() {
  clearInterval(roundTimer);
  let time = 10;
  document.getElementById("time").textContent = time;
  roundTimer = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) checkAnswer(null);
  }, 1000);
}

// проверка ответа игрока
function checkAnswer(userAnswer) {
  if (!isGameActive) return;
  const correct = userAnswer === (currentWord === getColorName(currentColor));
  const res = document.getElementById("result");

  if (userAnswer === null) {
    res.textContent = "⏰ Время вышло!";
    res.style.color = "#888";
  } else if (correct) {
    score++;
    res.textContent = "✅ Правильно!";
    res.style.color = "green";
  } else {
    res.textContent = "❌ Неправильно!";
    res.style.color = "red";
    gameTimeLeft -= 3;
    if (gameTimeLeft < 0) gameTimeLeft = 0;
  }

  document.getElementById("score").textContent = score;
  document.getElementById("game-time").textContent = gameTimeLeft;
  setTimeout(showNewWord, 800);
}

// перевод английского цвета обратно в русское название
function getColorName(color) {
  return Object.entries(colorMap).find(([_, v]) => v === color)?.[0] || "";
}

// Общий таймер игры на 60 секунд
function startGameTimer() {
  const timerEl = document.getElementById("game-time");
  timerEl.textContent = gameTimeLeft;
  gameTimer = setInterval(() => {
    gameTimeLeft--;
    timerEl.textContent = gameTimeLeft;
    if (gameTimeLeft <= 0) endGame();
  }, 1000);
}

// конец игры
function endGame() {
  isGameActive = false;
  clearInterval(roundTimer);
  clearInterval(gameTimer);
  document.getElementById("word").style.display = "none";
  document.querySelector(".buttons").style.display = "none";

  const res = document.getElementById("result");
  res.textContent = `🏁 Игра окончена! Ваш счёт: ${score}`;
  res.style.color = "#333";
}

// Запуск игры
showNewWord();
startGameTimer();