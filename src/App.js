import React, { useState, useEffect } from "react";  
import Movie from "./Movie";

import './App.css';

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=d6416bf1'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_KEY}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Avengers');
    }, []);

    return (
        <div className="app">
            <h1>Movie DB</h1>
            <div className="search">
                <input type="text" placeholder="Search for movies" className="search-input"
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button type="button" className="search-button" onClick={() => searchMovies(searchValue)}>Search</button>
            </div>
            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => {
                            return <Movie key={movie.imdbID} movie={movie} />
                        })}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App;