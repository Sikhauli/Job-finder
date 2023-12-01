import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Profile from "./components/re-use-comp/Profile" 
import Home from "./components/re-use-comp/Home" 

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [filterSkills, setFilterSkills] = useState([]);

  const handleFilter = (skill) => {
    setFilterSkills((prevSkills) => [...prevSkills, skill]);
  };

  useEffect(() => {
    fetch(`http://localhost:1960/api/jobs/suggest?skills=${filterSkills.join(',')}`)
      .then((response) => response.json())
      .then((response) => console.log('response: ', response))
      .then((response) => setSearchResults(response))
      .catch((error) => console.error(error));
  }, [filterSkills]);

  console.log('searchResults', searchResults);

  return (
    <Router>
      <div className='w-full'>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;


