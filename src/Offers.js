import React, { useState, useEffect } from "react";
import vacanciesData from "./vacancies.json";

export default function Offers() {
  const [vacancies, setVacancies] = useState([]);
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    setVacancies(vacanciesData);
    const savedLikes = localStorage.getItem("likedVacancies");
    if (savedLikes) setLikedIds(JSON.parse(savedLikes));
  }, []);

  function toggleLike(id) {
    setLikedIds(prev => {
      const newLikes = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem("likedVacancies", JSON.stringify(newLikes)); 
      return newLikes;
    });
  }

  return (
    <div>
      <h1>Вакансии</h1>
      <div >
        {vacancies.map(vacancy => (
          <div
            key={vacancy.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>{vacancy.title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{vacancy.description}</p>
            </div>
            <button
              onClick={() => toggleLike(vacancy.id)}
              style={{
                backgroundColor: likedIds.includes(vacancy.id) ? "#ff4081" : "#e0e0e0",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                cursor: "pointer",
                color: likedIds.includes(vacancy.id) ? "white" : "#555",
                fontSize: 18,
                userSelect: "none",
                transition: "background-color 0.3s",
              }}
              aria-label={likedIds.includes(vacancy.id) ? "Убрать лайк" : "Поставить лайк"}
              title={likedIds.includes(vacancy.id) ? "Убрать лайк" : "Поставить лайк"}
            >
              ♥
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}