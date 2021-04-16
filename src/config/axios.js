import axios from 'axios';

const pokemonClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

export default pokemonClient;
