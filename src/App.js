import { React, useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';



const API_URL = 'http://www.omdbapi.com/?apikey=31f556b0';

let movie1 = {
  "Title": "Batman v Superman: Dawn of Justice",
  "Year": "2016",
  "imdbID": "tt2975590",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
};


const App = () => {
  //movies state for the list of movies
  const [movies, setMovies] = useState([]);
  //searchTerm state for the search input field
  const [searchTerm, setSearchTerm] = useState('');

  //Calls the API to search for a movie
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  //Searches for the search term 'Superman' when the page loads
  useEffect(() => {
    searchMovies('Superman')
  },[])

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange = {(e) => {setSearchTerm(e.target.value)}}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies.length > 0 ?
          (
            <div className="container">
              {movies.map((movie) => <MovieCard movie1={movie} />)}
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