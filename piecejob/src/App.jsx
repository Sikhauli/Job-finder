import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Profile from "./components/re-use-comp/Profile" 
import Home from "./components/re-use-comp/Home" 
import Jobs from "./components/re-use-comp/savedJobs" 
import MyJobs from "./components/re-use-comp/MyJobs"
import { Circles } from "react-loading-icons";
import { useSelector } from "react-redux";


function App() {
  const loading = useSelector((state) => state.loading.value);

  const LoadingScreen = () => {
    return (
      <div
        className={`absolute inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-black/10`}
      >
        <Circles fill="#006FEE" height="3rem" speed={2} />
      </div>
    );
  };

  return (
    <Router>
      <div className='w-full'>
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/savedJobs' element={<Jobs />} />
          <Route path='/myJobs' element={<MyJobs />} />
          </Routes>
        {loading && <LoadingScreen />}
      </div>
    </Router>
  );
}

export default App;


