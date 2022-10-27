import{GET_VIDEOGAMES,GET_VIDEOGAMES_NAME,GET_VIDEOGAMES_ID,GET_GENRES,POST_VIDEOGAME,FILTER_BY_GENRES,FILTER_CREATED,SORT_VIDEOGAMES_ALPHABETICALLY,SORT_VIDEOGAMES_BY_RATING,CLEAR_VIDEOGAMES,SEARCH_NAME} from '../Actions/index';

const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    videogameDetail: [],
    searchName:'',
 
}
function rootReducer (state = initialState, action){  
    switch(action.type){

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames:action.payload,
                allVideogames:action.payload
            }
   
        
        case GET_VIDEOGAMES_NAME:
            return {
                    ...state,
                    videogames:action.payload,
             } 

        case GET_VIDEOGAMES_ID:
            return {
                    ...state,
                    videogameDetail: action.payload
             }     
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }
                
        case POST_VIDEOGAME:
            return{
                ...state,
                videogames: [...state.videogames, action.payload],
                allVideogames: [...state.allVideogames, action.payload],
                
            }
        

        case FILTER_BY_GENRES:
            let filtered = [];
           let videogames = [...state.allVideogames]
           videogames.map(game => [game.genres].toString().split(', ').toString().split(',').includes(action.payload) ? filtered.push(game) : null)
           return {
              ...state,
              videogames: filtered
          };

        case FILTER_CREATED:
           
            const createdFilter =
            action.payload === "Created"
              ? state.allVideogames.filter((e) => e.id.length > 2)
              : state.allVideogames.filter((e) => e.id <= 40);
          return {
            ...state,
            videogames:
              action.payload === "All" ? state.allVideogames : createdFilter,
          }
        
        case SORT_VIDEOGAMES_ALPHABETICALLY:
            let orderAsc = state.videogames.slice().sort((a, b) => {
                let videogamesA = a.name.toLowerCase();
                let videogamesB = b.name.toLowerCase();

                if(videogamesA > videogamesB) return 1;

                if(videogamesB > videogamesA) return -1; 

                return 0;
            }) 

            const allVideogames3 = state.allVideogames;
            const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse();

            return {
                ...state,
                videogames: action.payload === '' ? allVideogames3 : orderName
            }
        

        case SORT_VIDEOGAMES_BY_RATING: 
           let orderRatingAsc = state.videogames.slice().sort((a, b) => {

            if(Number(a.rating) > Number(b.rating)) return 1;

            if(Number(b.rating) > Number(a.rating)) return -1;

            return 0;
        })

        return {
            ...state,
            videogames: action.payload === 'asc' ? orderRatingAsc : orderRatingAsc.reverse()
        }

        case CLEAR_VIDEOGAMES:
            return {
                ...state,
                videogames : [],
                allVideogames: [],
                genres: []
            }
              
        case SEARCH_NAME:
            return {
                ...state,
                searchName: action.payload,
            }

            default:
                return { ...state };
            
               
    }
}



export default rootReducer