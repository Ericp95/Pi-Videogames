import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../Redux/Actions";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/searchbar";
import CardVideogames from "../CardVideogames/cardvideogames";
import Paginate from "../Paginate/paginate";
import Filter from "../Filter/filter";
import Orderby from "../Orderby/orderby";
import { filterVideogameByGenres, filterCreated } from "../../Redux/Actions";
import { sortVideogameAlphabetically, sortVideogameByRating } from "../../Redux/Actions";
import { Link } from "react-router-dom";

import s from './home.module.css';


export default function Home() {

    let dispatch = useDispatch();
 
    const allVideogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const [source, setSource] = useState("All");
    const [namechange, setNamechange] = useState('');
    const [ratingchange, setRatingchange] = useState('');
    const [genrechange, setGenrechange] = useState('');

    
    const [, setOrder] = useState()

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        setNamechange("");
        setRatingchange("");
        setGenrechange("")
        setCurrentPage(1);
        setSource("All");
        // window.location.reload()
    }

    function handlerGenres(e) {
        e.preventDefault();
        dispatch(filterVideogameByGenres(e.target.value));
        setCurrentPage(1);
        setSource("All");
        setGenrechange(e.target.value);
        setOrder("Order" + e.target.value)
    }
    
   function handlerCreated(e) {
        dispatch(filterCreated(e));
        console.log(e);
        setSource(e);
        setCurrentPage(1); 
        setGenrechange("");
        setOrder("Order" + e)
    }

    function handlerByName(e) { 
        dispatch(sortVideogameAlphabetically(e.target.value))
        setCurrentPage(1);
        setRatingchange("");
        setNamechange(e.target.value);                      
        setOrder("Order" + e.target.value) 
    }

    function handlerByRating(e) { 
        dispatch(sortVideogameByRating(e.target.value));
        setCurrentPage(1);   
        setNamechange("");                   
        setRatingchange(e.target.value); 
        setOrder("Order" + e.target.value); 
    }


    return (
        <div>

            <Navbar/>
           
          
            <div className={s.divTwoColum}>
                
                <div className={s.firstColum}>
                    <Orderby handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange}/>
                    <Filter handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange}/>   
                    <button onClick={e => {handleClick(e)}} className={s.btn}>
                        RESET
                    </button>
                </div>

                <div className={s.secondColum}>
                    <h1 className={s.title}>VIDEOGAME LIST</h1>
                    <SearchBar setCurrentPage={setCurrentPage}/>
                    <Paginate videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} pagination={pagination} currentPage={currentPage}/>
                    
                    <div className={s.divCards}>
            {
                currentVideogames.length ? 
                typeof currentVideogames[0] === 'object' ?
                currentVideogames.map( el => {
                    return(

                        <div>
                          
                            <Link to={"/home/" + el.id} style={{textDecoration:'none'}} key={el.id}>
                            
                             < CardVideogames name={el.name} genres={el.genres} img= {el.img } rating={el.rating} id={el.id} createdInDb={el.createdInDb} />                            
                            </Link>
                            
                        </div> 
                    )
                }) :
                <div className={s.notfound}>
                    <img src='images/notfound.png'alt="Videogame not found" width='200px'/>
                    <span>{currentVideogames[0]} </span>
                </div>
                :
                <div className={s.loading}> 
                    <img src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'alt="Loading.." width='250px'/>
                    <p className={s.loadingtext}>Loading...</p>
                </div>
            }
            </div>
                
                </div>
            </div>
        </div>
    )
}