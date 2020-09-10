import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  // eslint-disable-next-line
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Conceitos de node",
      "url": "https://github.com/Phaullo/gostack-template-conceitos-nodejs",
      "techs": ["Python", "NodeJS"]
    })
    // eslint-disable-next-line
    let repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>{repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
