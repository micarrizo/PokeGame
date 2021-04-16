import { combineReducers } from 'redux';
import pokemonsReducer from '../reducers/pokemonsReducer';

export default combineReducers({
    all_pokemon: pokemonsReducer
})