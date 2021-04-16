import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { currentPokemonModal } from '../../actions/pokemonActions'
import '../../assets/scss/layout.scss';

const PokeCard = ({pokemon}) => {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(currentPokemonModal(pokemon));
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

export default PokeCard;