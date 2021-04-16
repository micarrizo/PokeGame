import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';
import { Provider } from 'react-redux';
import store from './app/store';
//Components
import PokeGrid  from './components/PokeGrid/PokeGrid'
import PokeHome  from './components/PokeHome'
import NewPokeFight  from './components/PokeFight/NewPokeFight'
import PokeFight  from './components/PokeFight/PokeFight'

 
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Fragment>
        <div className="game-container">
            <Switch>
              <Route exact path="/" component={PokeHome} />
              <Route exact path="/new-poke-fight" component={NewPokeFight} />
              <Route exact path="/PokeFight" component={PokeFight} />
              <Route exact path="/pokemons" component={PokeGrid}/>
            </Switch>
          </div>
        </Fragment>
      </Provider>
    </Router>
  );
}

export default App;
