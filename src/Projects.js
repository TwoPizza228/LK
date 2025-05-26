import React, { useState, useRef, useEffect } from "react"; 
import "./style.css"; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const nameRef = useRef();
  const descRef = useRef();
  const fileRef = useRef();
  useEffect(() => {
    const savedProjects = localStorage.getItem("projectsList");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function addProject() {
    const name = nameRef.current.value.trim();
    const description = descRef.current.value.trim();
    const file = fileRef.current.files[0];

    if (!name || !description) {
      alert("Заполните все поля!");
      return;
    }

    const newProject = { name, description, fileName: file ? file.name : null };

    // Обновляем состояние и сохраняем в localStorage
    setProjects(prev => {
      const newProjects = [...prev, newProject];
      localStorage.setItem("projectsList", JSON.stringify(newProjects)); // сохраняем
      return newProjects;
    });

    // Очистить поля
    nameRef.current.value = "";
    descRef.current.value = "";
    fileRef.current.value = null;

    closeModal();
  }

  return (
  <div id="projects-container">
    <h1>Проекты</h1>
    <button id="projects-add-btn" onClick={openModal}>
      Добавить проект
    </button>

    <ul id="projects-list">
      {projects.map((project, i) => (
        <li key={i} className="project-item">
          <strong>{project.name}</strong>
          <p>{project.description}</p>
          {project.fileName && (
            <a
              href="#!"
              onClick={() => alert(`Файл загружен: ${project.fileName}`)}
              className="project-file-link"
            >
              Прикрепленный файл
            </a>
          )}
        </li>
      ))}
    </ul>

    {modalOpen && (
      <div id="projects-modal-overlay">
        <div id="projects-modal-content">
          <span id="projects-modal-close" onClick={closeModal} title="Закрыть">
            &times;
          </span>
          <h3>Добавить проект</h3>
          <input
            type="text"
            placeholder="Название проекта"
            ref={nameRef}
            id="project-name-input"
          />
          <textarea
            placeholder="Описание проекта"
            ref={descRef}
            id="project-description-input"
          />
          <input type="file" ref={fileRef} id="project-file-input" />
          <button id="project-submit-btn" onClick={addProject}>
            Добавить
          </button>
        </div>
      </div>
    )}
  </div>
);
}
