import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
    .then(res => {
      setProjects(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }, [])

  return (
    <div className="App">
      {projects.map(project => {
        return (
          <div>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
