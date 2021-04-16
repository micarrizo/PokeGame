import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllPokemon } from '../../actions/pokemonActions';
import PokeGridModal from './PokeGridModal'
import { currentPokemonModal } from '../../actions/pokemonActions'
import '../../assets/scss/pokefight.scss';
import '../../assets/scss/layout.scss';


const NewPokeFight = () => {
    const dispatch = useDispatch();
    const [pokemonPlayer, setPokemonPlayer] = useState('')

    useEffect(() => {
        const loadPokemons = () => dispatch(getAllPokemon(0));
        loadPokemons();
    }, []);

    const currentPokeModal = useSelector(state => state.all_pokemon.currentPokemonModal);
    const currentPokemonPlayer1 = useSelector(state => state.all_pokemon.playerSelection.filter( poke => poke.player === 1 ))
    const currentPokemonPlayer2 = useSelector(state => state.all_pokemon.playerSelection.filter( poke => poke.player === 2 ))

    const activateModal = (player) => {
        setPokemonPlayer(player)
        dispatch(currentPokemonModal(player));
    }

    const playerFill = useSelector(state => state.all_pokemon.playerSelection)

    return (
        <Fragment>
            {currentPokeModal && <PokeGridModal pokemonPlayer={pokemonPlayer} />}
            <div className="pokenewfight_card center box">
                <h1 className="pokenewfight_card-title retro-text text-center">Select your Pokemon</h1>
                <div className="pokenewfight_card-options flex-center">
                    <span className="pokenewfight_card-label retro-text">Player 1</span>
                    <span onClick={() => activateModal(1)} className="pokenewfight_card-button pointer retro-text">
                        {(currentPokemonPlayer1.length === 0) ? 'Select Pokemon' : currentPokemonPlayer1[0].pokename.name}    
                    </span>   
                </div>
                <div className="pokenewfight_card-options flex-center">
                    <span className="pokenewfight_card-label retro-text">Player 2</span>
                    <span onClick={() => activateModal(2)} className="pokenewfight_card-button pointer retro-text">
                        {(currentPokemonPlayer2.length === 0) ? 'Select Pokemon' : currentPokemonPlayer2[0].pokename.name}    
                    </span>
                </div>
                <div>
                    {playerFill.length === 2 && <Link className="retro-text pokenewfight_card-button pointer fight" to={'/PokeFight'}>Fight</Link>}
                </div>
                <div>
                    <Link to={'/'} className='pokenewfight-back retro-text text-center pointer'> Back to Home </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default NewPokeFight;