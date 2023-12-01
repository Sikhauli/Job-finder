 import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

const SearchBar = ({ updateSearchResults }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = async (query) => {

        if (!query) {
            enqueueSnackbar('Please enter a search query', { variant: 'error' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:1960/api/jobs/search?keyword=${query}`);
            const data = await response.json();
            setSearchResults(data);
            updateSearchResults(data);
            setSearchText('');
        } catch (error) {
            console.error(error);
            enqueueSnackbar(error.response?.data?.message || 'An error occurred', { variant: 'error' });
        }
    };

    return (
        <div className="flex items-center w-1/2 mb-5 mx-auto">
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search Jobs..."
                className="h-14 w-full px-4 border border-r-0 border-gray-300 mt-3 rounded-l-none focus:outline-none focus:border-blue-500"
            />
            <button
                onClick={() => handleSearch(searchText)}
                className="h-14 w-20 bg-blue-500 text-white rounded-l-none mt-3 hover:bg-blue-600 focus:outline-none"
            >
                Search
            </button>
            {searchText && (
                <button
                    onClick={() => setSearchText('')}
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default SearchBar;
