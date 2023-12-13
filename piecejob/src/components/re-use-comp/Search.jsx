import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
    getAxiosError,
    JOB_ENDPOINTS,
    API_BASE_URL,
} from "../../helpers/constants"
import axios from 'axios';


const SearchBar = ({ updateSearchResults }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    // for searching
    useEffect(() => {
        if (searchText && searchText?.length > 2) {
            axios.get(`${API_BASE_URL}${JOB_ENDPOINTS.get}/search?keyword=${searchText}`)
                .then((response) => {
                    setSearchResults(response.data);
                    updateSearchResults(response.data);
                })
                .catch((error) => {
                    enqueueSnackbar(getAxiosError(error), { variant: "error" });
                });
        } else {
            setSearchResults([]); 
        }
    }, [searchText]);

    return (
        <div className="flex items-center w-1/2 mb-5 mx-auto">
            <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search for jobs..."
                className="h-14 w-full px-4 border border-gray-300 mt-3 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default SearchBar;
