import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import CancelIcon from '@material-ui/icons/Cancel';
import './Movie.css';




const Movie = (props) =>{
    Modal.setAppElement('body')
    const img_api = 
    "https://image.tmdb.org/t/p/w500/";
    const backdrop_api = "https://image.tmdb.org/t/p/original/";

    const [trailerKey, setTrailerKey] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () =>{
        setShowModal(!showModal);
    }

    // const getMovieTrailerAsync = () =>{
    //     const key = getTrailerKeyAsync();
    // }

    function fetchTrailer(id){
        const movieLink = "http://api.themoviedb.org/3/movie/" + id + "?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos";

        return fetch(movieLink).then(res => res.json()).then((data) => {return data;})
    }

     function getTrailerKey(id){

        fetchTrailer(id).then((result) => {
            //console.log(result.videos.results[0].key)
            const ytLink = "https://youtube.com/watch?v=" + result.videos.results[0].key;
            
            window.open(ytLink);
        })
    }

    return(
        <div className = "movie">

            <img onClick = {handleImageClick} className = "movie-img" src = {img_api + props.movie.poster_path} alt = "Image Not Found"/>           
            
            <Modal isOpen = {showModal} closeTimeoutMS = {500} >
                <div className = "popup-banner" style = {{
                    background: "linear-gradient(to left top, transparent 30%, black 100%),url(" + backdrop_api + props.movie.backdrop_path + ")",
                    backgroundSize: "cover",
                    height: "100%",
                    }}>
                        <div className = "popup-header">
                <h2 id = "popup-title">{props.movie.title}<p id = "rating">{props.movie.vote_average} / 10</p></h2>
                <button id = "btn-banner-close" onClick = {handleImageClick}>
                    <CancelIcon />
                </button>
                </div>
                <p className = "popup-description">{props.movie.overview&& props.movie.overview.slice(0,200) + "..."}</p>
                
                <button onClick = {() => getTrailerKey(props.movie.id)} id = "btn-trailer">Trailer</button>
                
                </div>
            </Modal>
        </div>
    )
}

export default Movie;