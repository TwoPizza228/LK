

import React, { useState, useEffect } from "react";
import "./style.css"; 


const questions = [
  { text: "Любишь ли ты работать с людьми?", image: "/image/1.png" },
  { text: "Тебе нравится разбирать сложные задачи?", image: "/image/2.png" },
  { text: "Тебя привлекает работа за компьютером?", image: "/image/3.png" },
  { text: "Интересуешься ли ты техникой?", image: "/image/4.png" },
  { text: "Любишь ли ты творить что-то новое?", image: "/image/5.png" },
  { text: "Нравится ли тебе работать руками?", image: "/image/6.png" },
  { text: "Тебе важно помогать людям?", image: "/image/7.png" },
  { text: "Интересуешься ли ты наукой?", image: "/image/8.png" },
  { text: "Любишь ли ты природу и животных?", image: "/image/9.png" },
  { text: "Тебя привлекает работа в бизнесе?", image: "/image/10.png" },
  { text: "Хочешь ли ты путешествовать по работе?", image: "/image/11.png" },
  { text: "Любишь ли ты спорт?", image: "/image/12.png" },
  { text: "Легко ли тебе запоминать много информации?", image: "/image/13.png" },
  { text: "Нравится ли тебе преподавать другим?", image: "/image/14.png" },
  { text: "Тебе комфортно работать в офисе?", image: "/image/15.png" },
  { text: "Готов ли ты к частым поездкам?", image: "/image/16.png" },
  { text: "Хотел бы ты работать на себя?", image: "/image/17.png" },
  { text: "Готов ли ты к сменному графику?", image: "/image/18.png" },
  { text: "Любишь ли ты монотонную работу?", image: "/image/19.png" },
  { text: "Можешь ли концентрироваться в шуме?", image: "/image/20.png" }
];

const professions = [
  "Инженер",
  "Программист",
  "Биолог",
  "Педагог",
  "Менеджер"
];

export default function Test() {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("testAnswers");
    if (savedAnswers) {
      const parsed = JSON.parse(savedAnswers);
      setAnswers(parsed);
      setCurrentIndex(parsed.length);
      if (parsed.length === questions.length) {
        setFinished(true);
        calculateProfession(parsed);
      }
    }
  }, []);

  function calculateProfession(allAnswers) {
    const yesCount = allAnswers.filter(a => a === "Да").length;
    const index = Math.min(
      Math.floor((yesCount / questions.length) * professions.length),
      professions.length - 1
    );
    setSelectedProfession(professions[index]);
  }

  function handleAnswer(answer) {
    const newAnswers = [...answers, answer ? "Да" : "Нет"];
    setAnswers(newAnswers);
    localStorage.setItem("testAnswers", JSON.stringify(newAnswers)); // сохраняем

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateProfession(newAnswers); // вызываем расчет профессии
      setFinished(true);
    }
  }

  function resetTest() {
    setAnswers([]);
    setCurrentIndex(0);
    setFinished(false);
    setSelectedProfession(null);
    localStorage.removeItem("testAnswers");
  }

  if (finished) {
    return (
      <div id="test-finished">
        <h1>Тест завершён</h1>
        <p>Спасибо за прохождение теста!</p>
        <h2>Рекомендуемая профессия для вас:</h2>
        <div id="profession-result">{selectedProfession}</div>
        <h3>Ваши ответы:</h3>
        <ul id="answers-list">
          {answers.map((ans, i) => (
            <li key={i}>
              Вопрос {i + 1}: {ans}
            </li>
          ))}
        </ul>
        <button id="reset-btn" onClick={resetTest}>Пройти тест заново</button>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div id="test-container">
      <h1>Тест</h1>
      <p id="question-counter">{currentIndex + 1} из {questions.length}</p>
      <img
        id="question-image"
        src={question.image}
        alt={`Вопрос ${currentIndex + 1}`}
      />
      <p id="question-text">{question.text}</p>
      <div id="answer-buttons">
        <button id="btn-yes" onClick={() => handleAnswer(true)}>Да</button>
        <button id="btn-no" onClick={() => handleAnswer(false)}>Нет</button>
      </div>
    </div>
  );
}