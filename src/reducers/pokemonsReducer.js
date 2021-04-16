import {
    GET_ALL_POKEMON,
    GET_ALL_POKEMON_SUCCESS,
    GET_ALL_POKEMON_ERROR,
    NEW_POKEDEX_MODAL,
    NEW_POKEDEX_MODAL_SUCCESS,
    NEW_POKEDEX_MODAL_ERROR,
    CLEAR_POKEDEX_MODAL,
    CLEAR_POKEDEX_MODAL_SUCCESS,
    CLEAR_POKEDEX_MODAL_ERROR,
    SELECT_POKEMON,
    SELECT_POKEMON_SUCCESS,
    SELECT_POKEMON_ERROR,

} from '../types'

const initialState = {
    pokemons: [],
    currentPokemonModal: null,
    playerSelection: [],
    next: null,
    loading: false,
    error: null,   
}

export default function pokemonReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_POKEMON:
        case NEW_POKEDEX_MODAL:
        case CLEAR_POKEDEX_MODAL:
        case SELECT_POKEMON:
            return {
                ...state,
                loading: action.payload
            }
        case GET_ALL_POKEMON_SUCCESS:
            return {
                ...state,
                loading: false,
                pokemons: [...action.payload],
                // next: action.payload.next
            }
        case GET_ALL_POKEMON_ERROR:
            return {
                ...state,
                loading: false,
                pokemons: [],
                error: action.payload
            }
        case NEW_POKEDEX_MODAL_ERROR:
            return {
                ...state,
                loading: false,
                currentPokemonModal: [],
                error: action.payload
            }
        case NEW_POKEDEX_MODAL_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPokemonModal: {...action.payload}
            }
        case CLEAR_POKEDEX_MODAL_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPokemonModal: action.payload
            }
        case CLEAR_POKEDEX_MODAL_ERROR:
        case SELECT_POKEMON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SELECT_POKEMON_SUCCESS:
            return {
                ...state,
                loading: false,
                playerSelection: [...state.playerSelection.filter(player => player.player !== action.payload.player),{...action.payload}]
            }
        default:
            return state;
    }
}