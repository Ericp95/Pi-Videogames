import React from 'react';
//import SearchBar from '../SearchBar/searchbar'
import s from './navbar.module.css';
import { Link } from 'react-router-dom';


export default function Navbar () {
    return (
        <div  className={s.nav}>

        

            <Link to='/home'>
                <span className={s.text}>HOME</span>
            </Link>

            <Link to='/createvideogame'>
                <span className={s.text}>NEW VIDEOGAME</span>
            </Link>

            
            
            

        </div> 
        
    )
}

//{onSearch}