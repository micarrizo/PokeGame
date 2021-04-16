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
} from '../types';

import pokemonClient from '../config/axios';

export function getAllPokemon(offset){
    return async (dispatch) => {
        dispatch ( getPokemon() );
        try {
            offset = (offset-1)*24
            const basePokemons = await pokemonClient.get(`/pokemon/?offset=${offset}&limit=24`);
            const detallePokemons = await Promise.all(basePokemons.data.results.map(async (pokemon) => {
                const detallePokemon = await pokemonClient.get(`/pokemon/${pokemon.name}`);
                return detallePokemon.data
            })) 
            dispatch ( getPokemonSuccess(detallePokemons) )

        } catch (error) {
            dispatch ( getPokemonError() )
        }
    }
}

const getPokemon = () => ({
    type: GET_ALL_POKEMON,
    payload: true
})

const getPokemonSuccess = (pokemons) => ({
    type: GET_ALL_POKEMON_SUCCESS,
    payload: pokemons
})

const getPokemonError = () => ({
    type: GET_ALL_POKEMON_ERROR,
    payload: true
})


export function currentPokemonModal(newPokemonModal){
    return async (dispatch) => {
        dispatch ( newPokeModal() );
        try {
            const species = await pokemonClient.get(newPokemonModal.species.url);
            const evolutions = await pokemonClient.get(species.data.evolution_chain.url);
            const evolutionsNames = [];
            const getEvolutions = (poke) => {
                evolutionsNames.push(poke.species.name);
                poke.evolves_to.length > 0 && poke.evolves_to.forEach(getEvolutions);
            }
            evolutions.data.chain.evolves_to.forEach(getEvolutions);
            
            const evolutionData = await Promise.all(evolutionsNames.map(async (evo) => {
                const evolution = await pokemonClient.get(`/pokemon/${evo}`);
                return evolution.data;
            }))
            dispatch ( newPokemonModalSuccess({...newPokemonModal,evolutionData}) );
        } catch (error) {
            dispatch ( newPokemonModalError() );
        }
    }
}

const newPokeModal = () => ({
    type: NEW_POKEDEX_MODAL,
    payload: true
})

const newPokemonModalSuccess = (newPokemonModal) => ({
    type: NEW_POKEDEX_MODAL_SUCCESS,
    payload: newPokemonModal
})

const newPokemonModalError = () => ({
    type: NEW_POKEDEX_MODAL_ERROR,
    payload: true
})

export function clearPokeModal(){
    return async (dispatch) => {
        dispatch ( clearPokemonModal() );
        try {
            dispatch ( clearPokeModalSuccess() )
        } catch (error) {
            dispatch ( clearPokeModalError() )
        }
    }
}

const clearPokemonModal = () => ({
    type: CLEAR_POKEDEX_MODAL,
    payload: true
})

const clearPokeModalSuccess = () => ({
    type: CLEAR_POKEDEX_MODAL_SUCCESS,
    payload: null
})

const clearPokeModalError = () => ({
    type: CLEAR_POKEDEX_MODAL_ERROR,
    payload: true
})

export function selectPokemonPlayer(player, pokename){
    return async (dispatch) => {
        dispatch ( selectPokemon() );
        try {
            dispatch ( selectPokemonSuccess({ player, pokename }) )
        } catch (error) {
            dispatch ( selectPokemonError() )
        }
    }
}

const selectPokemon = () => ({
    type: SELECT_POKEMON,
    payload: true
})

const selectPokemonSuccess = (playerPokename) => ({
    type: SELECT_POKEMON_SUCCESS,
    payload: playerPokename
})

const selectPokemonError = () => ({
    type: SELECT_POKEMON_ERROR,
    payload: true
})

