import React from 'react';
import { Link } from 'react-router-dom'
import '../assets/scss/home.scss';
import '../assets/scss/layout.scss';

const PokeHome = () => {
    return (
            <div className="pokehome_card center box">
                <h1 className="pokehome_card-title retro-text text-center">Pokemon React</h1>
                <div className="pokehome_card-options flex-center flex-vertical">
                    <Link className="retro-text pokehome_card-button pointer" to={'/new-poke-fight'}>PokeFight</Link>
                    <Link className="retro-text pokehome_card-button pointer" to={'/pokemons'}>Pokedex</Link>
                </div>
            </div>
    );
}

export default PokeHome;