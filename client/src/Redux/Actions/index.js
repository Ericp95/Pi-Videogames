import axios from "axios"

export const GET_VIDEOGAMES='GET_VIDEOGAMES';
export const GET_VIDEOGAMES_NAME=' GET_VIDEOGAMES_NAME';
export const GET_VIDEOGAMES_ID='GET_VIDEOGAMES_ID';
export const GET_GENRES='GET_GENRES';
export const POST_VIDEOGAME='POST_VIDEOGAME';
export const FILTER_BY_GENRES='FILTER_BY_GENRES';
export const FILTER_CREATED='FILTER_CREATED';//PA FILTRAT JUEGOS CREADOS X NOSOTROS
export const SORT_VIDEOGAMES_ALPHABETICALLY='SORT_VIDEOGAMES_ALPHABETICALLY';
export const SORT_VIDEOGAMES_BY_RATING='SORT_VIDEOGAMES_BY_RATING';
export const CLEAR_VIDEOGAMES='CLEAR_VIDEOGAMES';
export const SEARCH_NAME='SEARCH_NAME';
export function getVideogames() {
    return function(dispatch) {
        axios.get("http://localhost:3001/videogames")
            .then(response => {
                return dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
   
}

export function getVideogameName(name){ 
    return function(dispatch) {
        axios.get(`http://localhost:3001/videogames?name=${name}`)
           .then(response => {
                 return dispatch({
                   type: 'GET_VIDEOGAMES_NAME',
                   payload: response.data
                    })
             })           
    }
   
    
   
}

export function  getVideogameId (id){
    
        return function(dispatch) {
            axios.get(`http://localhost:3001/videogames/${id}`)
                .then(response => {
                    return dispatch({
                        type: 'GET_VIDEOGAMES_ID',
                        payload: response.data
                    })
                }) 
        }
      
    
}

export function getGenres(){
    return function(dispatch) {
        axios.get("http://localhost:3001/genres")
            .then(response => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: response.data
                })
            })
    }
}

export function postVideogame(form){
    return async function (dispatch) {
        try {
            return await fetch('http://localhost:3001/videogame', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: "POST_VIDEOGAME",
                        payload: data
                    })
                });
        } catch (error) {
            return console.log(error)
        }
    }

    
}
   


export function filterVideogameByGenres(payload){
    return {
        type:'FILTER_BY_GENRES',
        payload
    }
}

export function filterCreated(payload){
    
    return {
        type:'FILTER_CREATED',
        payload
    }
}

export function sortVideogameAlphabetically(typeOfSort) {
    //typeOfSort= ascendente o descendente
    return {
      type: 'SORT_VIDEOGAMES_ALPHABETICALLY',
      payload : typeOfSort,
    };
}

export function sortVideogameByRating(typeOfSort) {
    //typeOfSort= ascendente o descendente
    return {
      type: 'SORT_VIDEOGAMES_BY_RATING',
      payload : typeOfSort,
    };
}

export function clearName() {
    return {
        type: "CLEAR_VIDEOGAMES",
       
    }
}

export function searchName(payload) {
    return {
        type: "SEARCH_NAME",
        payload
    }
}


