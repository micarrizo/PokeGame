import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import '../../assets/scss/pokefight.scss';
import '../../assets/scss/layout.scss';


const PokeFight = () => {
    const playersPokemons = useSelector(state => state.all_pokemon.playerSelection)
    const pokemonsToFightObject = {}
    playersPokemons.map(async (playerPokemon) => {
        pokemonsToFightObject[`player${playerPokemon.player}`] = playerPokemon.pokename
    })
    const [whosPlaying, setWhosPlaying] = useState(1)
    const [isFighting, setIsFighting] = useState(true)
    const [usedMove, setUsedMove] = useState('')

    const pokemon1 = pokemonsToFightObject.player1
    const pokemon2 = pokemonsToFightObject.player2

    const initialLifeP1 = pokemon1.stats.filter(stat => stat.stat.name === 'hp')[0].base_stat
    const initialLifeP2 = pokemon2.stats.filter(stat => stat.stat.name === 'hp')[0].base_stat

    const [pokemon1Life, setPokemon1Life] = useState(initialLifeP1)
    const [pokemon2Life, setPokemon2Life] = useState(initialLifeP2)

    const pokemon1Photo = pokemon1.sprites.back_default
    const pokemon2Photo = pokemon2.sprites.front_default

    const movesP1 = pokemon1.moves.slice(0, 4).map(move => move.move.name)
    const movesP2 = pokemon2.moves.slice(0, 4).map(move => move.move.name)

    const attack = (move) => {

        setUsedMove(move)
        setIsFighting(false)
        const maxDamage = (whosPlaying === 1) ? pokemon2Life : pokemon1Life
        const damage = Math.floor(Math.random() * (maxDamage + 1))

        if (whosPlaying === 1) {
            setPokemon2Life((damage <= pokemon2Life ? (pokemon2Life - damage) : 0))
        } else {
            setPokemon1Life((damage <= pokemon1Life ? (pokemon1Life - damage) : 0))
        }

        const timeout = setTimeout(() => {
            setIsFighting(true)
            setWhosPlaying((whosPlaying === 1 ? 2 : 1))
        }, 2000);

        return () => clearTimeout(timeout)
    }
    return (
        <div className="pokefight_card center box">
            <div className="gameFight-container">
                <div className="player2 stats">
                    <h3 className="retro-text">{pokemon2.name}</h3>
                    <div className="health">
                        <div className="health-bar">
                            <div className="fill" style={{ width: `${(pokemon2Life / initialLifeP2) * 100}%` }}></div>
                        </div>
                        <div className="health-status retro-text">{pokemon2Life}/{initialLifeP2}</div>
                    </div>
                </div>
                <div className="player1 stats">
                    <h3 className="retro-text">{pokemon1.name}</h3>
                    <div className="health">
                        <div className="health-bar">
                            <div className="fill" style={{ width: `${(pokemon1Life / initialLifeP1) * 100}%` }}></div>
                        </div>
                        <div className="health-status retro-text">{pokemon1Life}/{initialLifeP1}</div>
                    </div>
                </div>
                <div className="player1 pokemon">
                    <img src={pokemon1Photo} alt="" />
                </div>
                <div className="player2 pokemon">
                    <img src={pokemon2Photo} alt="" />
                </div>
            </div>
            <div className="text_banner retro-text">
                <div className="text_banner-border flex-center">
                    {(pokemon1Life > 0 && pokemon2Life > 0) ? (
                        <div className="text_banner-content fight-text">
                            {(isFighting) ? (
                                <div>
                                    <p>Player {whosPlaying}'s turn:</p>
                                    <div className="moves-container">
                                        {(whosPlaying === 1) ?
                                            movesP1.map(move => (
                                                <div key={move} onClick={() => attack(move)}>{move}</div>
                                            )) : movesP2.map(move => (
                                                <div key={move} onClick={() => attack(move)}>{move}</div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) :
                                <p>{(whosPlaying === 1) ? pokemon1.name : pokemon2.name} used {usedMove} </p>

                            }
                        </div>
                    ) : (
                        <div className="text_banner-content fight-text">
                            <p>Player {(pokemon1Life === 0 ? 2 : 1)} Wins!!!</p>
                            <Link className="retro-text pokenewfight_card-button pointer fight-text" style={{ marginTop: '18px' }} to={'/'}>Back to menu</Link>
                        </div>
                    )
                    }

                </div>
            </div>
        </div>
    );
}

export default PokeFight;