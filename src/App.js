import React from "react";


import "./styles.css";
import api from './services/api';
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title":`gostack-${Date.now()}`,
      "url": `http://github.com/danivaldo/repositorio-${Date.now()}`,
      "techs": [
        `Java-${Date.now()}`,
         `React-${Date.now()}`,
        `NodeJS-${Date.now()}` ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
     try {

          await api.delete(`repositories/${id}`);
          
        setRepositories(repositories.filter(repository => repository.id !== id)) ; 
          
      } catch (error) {
          alert('Erro ao deletar caso, tente novamente.')
      }
  }

  return (
    <div>
      <ul data-testid="repository-list">
       
        {repositories.map(repository => <li key={repository.id} >{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
         Remover
       </button> 
           </li> )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
