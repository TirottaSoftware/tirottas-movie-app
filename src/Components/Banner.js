import React, {useState, useEffect} from 'react'
import './Movie.css'

const Banner = (props) =>{
    const img_api = 
    "https://image.tmdb.org/t/p/original/";

    const [bannerMovie, setBannerMovie] = useState({})
    const randomNr = Math.floor(Math.random() * 18.69)

    useEffect(() => {
        setBannerMovie(props.movies[randomNr]);
    }, [])

    const getBannerBackground = () =>{
        const bannerBackground = img_api + bannerMovie?.backdrop_path;
        return bannerBackground;
    }

    function fetchTrailer(id){
        const movieLink = "http://api.themoviedb.org/3/movie/" + id + "?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos";

        return fetch(movieLink).then(res => res.json()).then((data) => {return data;})
    }

     function getMovieTrailer(id){

        fetchTrailer(id).then((result) => {
            //console.log(result.videos.results[0].key)
            const ytLink = "https://youtube.com/watch?v=" + result.videos.results[0].key;
            
            window.open(ytLink);
        })
    }

   return(
        <header className = "banner"
        style = {{
            background: "linear-gradient(to left, transparent 0%, black 80%),  url("+getBannerBackground() +") center center/100vw 100vh no-repeat ",
        }}>
            <div className = "banner-info">
                <h2>{bannerMovie.title}</h2>
                {/* <button id = "btn-imdb">IMDb</button> */}
                <p>{bannerMovie.overview&& bannerMovie.overview.slice(0,200) + "..."}</p>
                <button onClick = {() => getMovieTrailer(bannerMovie.id)} id = "btn-trailer">Watch Trailer</button>
            </div>
        </header>
    )
}

export default Banner;