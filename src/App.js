import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("react hooks");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchInputRef = useRef();

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://hn.algolia.com/api/v1/search?query=${query}`
            );

            setResults(response.data.hits);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const handleSearch = event => {
        event.preventDefault()
        getResults();
    }

    const handleClearClick = () => {
        setQuery('');
        searchInputRef.current.focus();
    }

  return (
    <>
    <form
    onSubmit={handleSearch}>
    <input
    type="text"
    onChange={event => setQuery(event.target.value)}
    value={query}
    ref={searchInputRef}
    />
    <button type="text" >Search</button>
    <button type="button" onClick={handleClearClick}>Clear</button>
    </form>

    {loading ?
    <div>Loading...</div> :
    (
    <ul>
        {results.map(results => (
            <li key={results.objectID}>
                <a href={results.url}>{results.title}</a>
            </li>
        ))}
    </ul>
    )}

    {error && <div>{error.message}</div>}
    </>
  );
}


