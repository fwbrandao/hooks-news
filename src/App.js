import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("react hooks");

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        const response = await axios.get(
            `http://hn.algolia.com/api/v1/search?query=${query}`
        );
            setResults(response.data.hits);
    }

    const handleSearch = event => {
        event.preventDefault()
        getResults();
    }

  return (
    <>
    <form onSubmit={handleSearch}>
    <input
    type="text"
    onChange={event => setQuery(event.target.value)}
    value={query}
    />
    <button type="text" >Search</button>
    </form>

    <ul>
        {results.map(results => (
            <li key={results.objectID}>
                <a href={results.url}>{results.title}</a>
            </li>
        ))}
    </ul>
    </>
  );
}


