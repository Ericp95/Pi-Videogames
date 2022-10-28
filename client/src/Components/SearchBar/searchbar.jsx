import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../Redux/Actions";
import  "./searchbar.module.css";

export default function SearchBar({setCurrentPage}){
  const dispatch = useDispatch(); 
  const [name, setName] = useState('')

 
  

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getVideogameName(name));
    setCurrentPage(1)
    setName('')
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
    <button className ="boton" type="submit"  onClick={( e) => handleSubmit(e)}> Search </button>
  </div> 
    
  )

}


