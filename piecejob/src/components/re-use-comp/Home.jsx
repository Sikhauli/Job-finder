import React, { useState, useEffect } from 'react';

import Navigation from './navigation';
import SearchBar from './Search';
import JobFilter from './filter';
import ViewJobs from './ViewJobs';
import LatestJobs from './LatestJobs';
import LeftContainer from './LeftContainer';

const Home = () => {

    const [searchResults, setSearchResults] = useState([]);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    }; 

    console.log("searchResults :", searchResults)

    return (
      <>
        <Navigation />
        <SearchBar updateSearchResults={updateSearchResults} />
        <div className='w-full flex'>
            <div className='w-1/3 h-screen'>
                <LeftContainer />
            </div>
            <div className='w-8/12 mr-2 ml-2'>
                <ViewJobs searchResults={searchResults} />
            </div>
            <div className=' w-1/3 h-screen' >
                <LatestJobs />
            </div>
        </div> 
      </>
    );
};


export default Home;
