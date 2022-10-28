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



