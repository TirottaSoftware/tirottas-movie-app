import React, { useState, useEffect} from 'react';
import Movie from './Components/Movie';
import Banner from './Components/Banner';
import moviesRes from './movies.js';
import './App.css';

function App() {

  const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=a8ddc54a46d9633a6500259806fbe193&language=en-US&query=";

  const api = moviesRes.defaultUrl;
  const apiTop = moviesRes.top;
  const apiPopular = moviesRes.popular;
  const apiUpcoming = moviesRes.upcoming + "&append_to_response=videos";

  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const moviesRef = [...movies];

  useEffect(() => {
       fetch(api)
      .then(res => res.json())
      .then((data) => {
      setMovies(data.results);
      return data;
    });

     fetch(apiPopular)
    .then(res => res.json())
    .then(data => {
      setPopularMovies(data.results);
      return data;
    })
    fetch(apiTop)
    .then(res => res.json())
    .then(data => {
      setTopMovies(data.results);
      return data;
    })

    fetch(apiUpcoming)
    .then(res => res.json())
    .then((data) => {
    setUpcomingMovies(data.results);
    return data;
  });

  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault();
    setPreviousSearch(searchTerm);

    if(searchTerm.length === 0){
      const appDiv = document.querySelector(".tobe-hidden");
      const banner = document.querySelector(".banner");
      const movieRow = document.querySelector("#first-row");
      const rowTitle = document.querySelector(".first-row-title");

      rowTitle.innerHTML = "popular";
      movieRow.classList.remove("wrap");
       banner.classList.remove("hidden");
      appDiv.classList.remove("hidden");

      fetch(api)
      .then(res => res.json())
      .then((data) => {
      setMovies(data.results);
      return data;
      });
    
      return;
    }
    else if(searchTerm === previousSearch){
      return;
    }

    let query = searchApi + searchTerm;

    fetch(query).then(res => res.json()).then((data) => {
      const appDiv = document.querySelector(".tobe-hidden");
      const banner = document.querySelector(".banner");
      const movieRow = document.querySelector("#first-row");
      const rowTitle = document.querySelector(".first-row-title");

      rowTitle.innerHTML = "Showing results for: " + searchTerm;
      movieRow.classList.add("wrap");
       banner.classList.add("hidden");
      appDiv.classList.add("hidden")
      
      setMovies(data.results);
    })
  }

  const handleInputChange = (e) =>{
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  
  return (
    <div className = "App">
      <form onSubmit = {handleSubmit} className = "navbar">
        <h3>Tirotta's Movie App</h3>
        <input id = "searchbar" type = "search" placeholder = "Search..." value = {searchTerm} onChange = {handleInputChange}/>
        <input id = "btn-search" type = "submit" value = "Search"/>
      </form>
      {popularMovies.length > 0 && <Banner  movies = {popularMovies} />}
      <h2 className = "first-row-title" id = "row-title" >Popular</h2>
      <div className="movie-row" id = "first-row" >
        {movies.length > 0 && movies.map(movie => movie.poster_path? <Movie key = {movie.id} movie = {movie}/> : null)}
      </div>
        <div className = "tobe-hidden">
          <h2 id = "row-title">top rated</h2>
        <div className="movie-row">
        {movies.length > 0 && topMovies.map(movie => <Movie key = {movie.id} movie = {movie}/>)}
        </div>
          <h2 id = "row-title">upcoming</h2>
       <div className="movie-row">
        {movies.length > 0 && upcomingMovies.map(movie => <Movie key = {movie.id} movie = {movie}/>)}
        </div>
      </div>
    </div>
  );  
}

export default App;
