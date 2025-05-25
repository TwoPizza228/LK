import React, { useState } from "react";
import "./style.css"; 
import Test from "./test";
import Tasks from "./Tasks";
import Profile from "./Profile";
import Projects from "./Projects";
import Offers from "./Offers";

const menuItems = [
  { id: "profile", label: "Профиль" },
  { id: "projects", label: "Проекты" },
  { id: "offers", label: "Предложения" },
  { id: "tasks", label: "Задачи" },
  { id: "test", label: "Тест" },
];

function Sidebar({ selected, onSelect }) {
  return (
    <div className="sidebar">
      <h2 style={{ color: "#fff", marginBottom: 20 }}>Личный кабинет</h2>
      <ul className="menuList">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`menuItem ${selected === item.id ? "active" : ""}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Content({ selected }) {
  switch (selected) {
    case "profile":
      return <Profile />;
    case "projects":
      return <Projects />;
    case "offers":
      return <Offers />;
    case "tasks":
      return <Tasks />;
    case "test":
      return <Test />;
    default:
      return <div>Выберите раздел</div>;
  }
}


export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <div className="container">
      <Sidebar selected={selectedMenu} onSelect={setSelectedMenu} />
      <div className="content">
        <Content selected={selectedMenu} />
      </div>
      
    </div>
  );
}
