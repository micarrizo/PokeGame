import React, { Fragment, useEffect, useState } from 'react';
import PokeCardModal from './PokeCardModal';
import { getAllPokemon } from '../../actions/pokemonActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearPokeModal } from '../../actions/pokemonActions';
import ReactPaginate from 'react-paginate';
import '../../assets/scss/layout.scss';
import '../../assets/scss/pagination.scss';

const PokeGridModal = ({pokemonPlayer}) => {
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(1);

    useEffect(() => {
        const loadPokemons = () => dispatch(getAllPokemon(offset));
        loadPokemons();
    }, [offset]);

    const pokemonsState = useSelector(state => state.all_pokemon.pokemons);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };
    

    const clearModal = () => {
        dispatch(clearPokeModal())
    }

    return (
        <Fragment>
            <div className="overlay flex-center" onClick={clearModal}>
                <div className="card appear-top" onClick={e => e.stopPropagation()}>
                    <h1 className="pokedex-title retro-text text-center">Select your Pokemon</h1>
                    <div className="pokemon-grid">
                        {pokemonsState.map(pokemon => <PokeCardModal pokemonPlayer={pokemonPlayer} key={pokemon.id}  pokemon={pokemon} />)}
                    </div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={47}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </div>
        </Fragment>
    );
}

export default PokeGridModal;