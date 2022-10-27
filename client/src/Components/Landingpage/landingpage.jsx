import React from "react";
import {Link} from "react-router-dom";
import s from "./landingpage.module.css"

export default function LandingPage() {

    return(
        <div className={s.divLP}>
            <div className={s.divTextBtn}>
                <h1 className={s.text}>
                    VIDEOGAMES APP
                </h1>
                
                <Link to = "/home">
                    <button className={s.btn}> START</button>
                </Link>
            </div>

           
        </div>
    )
}