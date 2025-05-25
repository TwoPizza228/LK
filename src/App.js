import React, { useState } from "react";
import Dashboard from "./LK";
import './style.css';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("data.json");
      const users = await response.json();
      const user = users.find(
        (u) => u.email === email.trim() && u.password === password.trim()
      );

      if (user) {
        setIsLoggedIn(true);
      } else {
        alert("Неверный email или пароль.");
      }
    } catch (error) {
      alert("Произошла ошибка при проверке данных.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return <Dashboard />;
  }

 return (
    <div id = "body2">
  <div className="container1">
    <h2 id="title">Авторизация</h2>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {"Войти"}
      </button>
    </form>
  </div>
  </div>
);
}