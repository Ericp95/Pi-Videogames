import React from 'react';
import { Link } from "react-router-dom";
import styles from   './cardvideogames.module.css';




export default function CardVideogames({ name, genres, img , rating,id}) {
  
        return(
            <div className={styles.cards}>
                <Link to={`/home/${id}`}>
                  <h3 className={styles.title}>{name}</h3>
                </Link> 
                         
                    <img className={styles.image} src={img} alt="img" />
                         
                   <div className={styles.text}>
                            
                            <div className={styles.description}>
                                <span className={styles.genres}>{genres}</span>
                                <span className={styles.rating}>{rating}</span>
                            </div>
                    </div>
                    
              
           </div>
        )
    
}


/* {
              typeof genres[0] === 'string' ? genres[0].charAt(0).toUpperCase() + genres[0].slice(1) : genres[0]?.name.charAt(0).toUpperCase() +
              genres[0].name.slice(1)}   
               { 
               typeof genres[1] === 'string' ? " - " + genres[1]   :  genres[1]?.name
               } */

 /*export default function CardVideogames({ name, genres, img,rating }) {
                return (
                  <div className="stylesCard">
                    <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    <img src={img} alt="img" className="img" width="120px" height="120px"/>
                    <ul className="typeStyle">
                    <span >{genres}</span>
                    <span >{rating}</span>
                    </ul>
                  </div>
                );
              }  */
//<h4 >{rating}</h4>
// <h5 >{genres}</h5>

/** return (
    <ul className={styles.cards}>
        {
            
                <Link to={`/home/${id}`}>
                    <li key={id} className={styles.card}>       
                    <img className={styles.image} src={img} alt="img" width="120px" height="120px"/>
                         
                   <div className={styles.text}>
                            <h3 className={styles.title}>{name}</h3>
                            <div className={styles.description}>
                                <span className={styles.genres}>{genres}</span>
                                <span className={styles.rating}>{rating}</span>
                            </div>
                    </div>
                    </li>
                </Link>
           
        }
    </ul>
) */
