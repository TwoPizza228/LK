import React, { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    if (savedName) setName(savedName);
  }, []);

  function updateName() {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setName(trimmed);
      localStorage.setItem("studentName", trimmed); 
      setInputValue("");
    } else {
      alert("Введите ФИО!");
    }
  }

  return (
    <div>
      <h1>Профиль студента</h1>
      <p><strong>ФИО:</strong> {name || "Не указано"}</p>
      <input
        type="text"
        placeholder="Введите ФИО"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={updateName}>Обновить имя</button>
      <button 
  onClick={() => window.location.reload()} 
  style={{ marginBottom: 20, padding: "8px 16px", cursor: "pointer" }}
>
  Выйти
</button>
    </div>
  );
}
