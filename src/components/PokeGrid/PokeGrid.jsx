import React, { Fragment, useEffect, useState } from 'react';
import PokeCard from './PokeCard';
import { getAllPokemon } from '../../actions/pokemonActions';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PokeModal from './PokeModal';
import { Link } from 'react-router-dom'
import '../../assets/scss/layout.scss';
import '../../assets/scss/pagination.scss';

const PokeGrid = () => {
	const dispatch = useDispatch();
	const [offset, setOffset] = useState(1);

	useEffect(() => {
		const loadPokemons = () => dispatch(getAllPokemon(offset));
		loadPokemons();
	}, [offset]);

	const pokemonsState = useSelector(state => state.all_pokemon.pokemons);
	const currentPokeModal = useSelector(state => state.all_pokemon.currentPokemonModal);

	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setOffset(selectedPage + 1)
	};

	return (
		<Fragment>
			{currentPokeModal && <PokeModal />}
			<div className="container">
				<h1 className="pokedex-title retro-text text-center">Pokedex</h1>
				<div className="flex-between">
					<Link to={'/'} className='pokedex-back retro-text text-center pointer'> Back to Home </Link>
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
				<div className="pokemon-grid">
					{pokemonsState.map(pokemon => <PokeCard key={pokemon.id} pokemon={pokemon} />)}
				</div>
			</div>
		</Fragment>
	);
}

export default PokeGrid;