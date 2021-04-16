import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPokeModal } from '../../actions/pokemonActions';
import '../../assets/scss/layout.scss';

const PokeModal = () => {

	const dispatch = useDispatch();

	const clearModal = () => {
		dispatch(clearPokeModal())
	}
	const currentPokeModal = useSelector(state => state.all_pokemon.currentPokemonModal);

	return (
		<Fragment>
			<div className="overlay" onClick={clearModal}>
				<div className="container">
					<div className="card appear-top" onClick={e => e.stopPropagation()}>
						<div className="row">
							<div className="col-6 flex-center">
								<img className="full-width" src={currentPokeModal.sprites.front_default}  alt=''/>
							</div>
							<div className="col-6">
								<h2>{currentPokeModal.name}</h2>
								<h4>Stats</h4>
								<ul>
									{currentPokeModal.stats.map(curr =>
										<li key={curr.stat.name} className="flex-between stat">
											<p>{curr.stat.name}</p>  <span>{curr.base_stat}</span>
										</li>
									)}
								</ul>
								<div className="row">
								<h4>Evoluciones</h4>
									{currentPokeModal.evolutionData.map(evo =>
										<div className="col-4">
											<div className="card pokemon">
												<img className="full-width" src={evo.sprites.front_default}  alt=''/>
												<h4 className="text-center">{evo.name}</h4>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default PokeModal;