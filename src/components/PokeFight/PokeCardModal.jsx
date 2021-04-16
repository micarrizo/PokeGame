import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { selectPokemonPlayer, clearPokeModal } from '../../actions/pokemonActions'
import '../../assets/scss/layout.scss';

const PokeCardModal = ({pokemon,pokemonPlayer}) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        dispatch ( selectPokemonPlayer(pokemonPlayer, pokemon) )
        dispatch(clearPokeModal())
    }

    return (
        <Fragment>
            <a className="card pokemon" onClick={handleClick}>
                <img src={pokemon.sprites.front_default} alt='' />
                <h4 className="text-center">{pokemon.name}</h4>
            </a>
        </Fragment>
    );
}

export default PokeCardModal;