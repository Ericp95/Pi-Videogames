import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../Redux/Actions";
import "./searchbar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch(); 
  const [name, setName] = useState('')

 
  
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);   
  };

  const handleSubmit= (e) => {
    e.preventDefault();
      dispatch(getVideogameName(name))
      setName("")
  
  }

  return (
    <div>
    <input
      className="search"
      value={name}
      type="text"
      onChange= {(e) => handleInputChange(e)}
      placeholder="Buscar..."
    /> 
    <button className ="boton" type="submit"  onClick={ (e) => handleSubmit(e)}> Buscar </button>
  </div> 
    
  )
}
