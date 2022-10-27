import React from "react";
import s from "./orderby.module.css"
//import SearchBar from "../SearchBar/searchbar";
export default function OrderBy({handlerByName, handlerByRating, namechange, ratingchange}) {

    return (
        <>
       
        <div className={s.divSort}>

           
            <p className={s.titles}>ORDER</p>

            <div className={s.divName}>
                <label className={s.subTitles}>Name </label>
                <select value={namechange} onChange={(e) => handlerByName(e)} className={s.selects}>
                    <option value=''>--Select--</option>
                    <option value='asc'>(A - Z)</option>
                    <option value='desc'>(Z - A)</option>
                </select>
            </div>

            <div className={s.divRating}>
                <label className={s.subTitles}>Rating</label>
                <select value={ratingchange} onChange={(e) => handlerByRating(e)} className={s.selects}>
                    <option value=''>--Select--</option>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
            </div>
        </div>
        </>
    )

}