import React, { useState, useEffect } from "react";
import "./style.css" // импорт CSS

export default function Tasks() {
  const [goals, setGoals] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedGoals = localStorage.getItem("tasksGoals");
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  function addGoal() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const newGoals = [...goals, { text: trimmed, done: false }];
    setGoals(newGoals);
    localStorage.setItem("tasksGoals", JSON.stringify(newGoals)); 
    setInputValue("");
  }

  function toggleDone(index) {
    const newGoals = goals.map((goal, i) =>
      i === index ? { ...goal, done: !goal.done } : goal
    );
    setGoals(newGoals);
    localStorage.setItem("tasksGoals", JSON.stringify(newGoals));
  }

  function deleteGoal(index) {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
    localStorage.setItem("tasksGoals", JSON.stringify(newGoals));
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addGoal();
    }
  }

  return (
    <div id="tasks-container">
      <p>Добавьте ваши цели и отмечайте их выполнение:</p>
      <div id="tasks-input-group">
        <input
          type="text"
          placeholder="Введите цель..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          id="tasks-input"
        />
        <button onClick={addGoal} id="tasks-add-btn">
          Добавить
        </button>
      </div>

      <ul id="tasks-list">
        {goals.map((goal, index) => (
          <li key={index} className="tasks-item">
            <div className="tasks-item-content">
              <input
                type="checkbox"
                checked={goal.done}
                onChange={() => toggleDone(index)}
                className="tasks-checkbox"
              />
              <span className={goal.done ? "tasks-text-done" : ""}>
                {goal.text}
              </span>
            </div>
            <button onClick={() => deleteGoal(index)} className="tasks-delete-btn">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
