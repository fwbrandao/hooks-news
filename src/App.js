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
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
      src="https://icon.now.sh/react/c0c"
      alt="React Logo"
      className="float-right h-12" />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
    <form
    className="mb-2"
    onSubmit={handleSearch}>
    <input
    className="border p-1 rounded"
    type="text"
    onChange={event => setQuery(event.target.value)}
    value={query}
    ref={searchInputRef}
    />
    <button
    className="bg-orange rounded m-1 p-1"
    type="submit" >Search</button>
    <button
    className="bg-teal text-black p-1 rounded"
    type="button"
    onClick={handleClearClick}>Clear</button>
    </form>

    {loading ?
    <div className="font-bold text-orange-dark">Loading...</div> :
    (
    <ul className="list-reset leading-normal">
        {results.map(results => (
            <li key={results.objectID}>
                <a
                className="text-indigo-dark hover:text-indigo-darkest"
                href={results.url}>{results.title}</a>
            </li>
        ))}
    </ul>
    )}

    {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}


