import { BrowserRouter, Route, Switch } from "react-router-dom";
import Tvshow from './views/Tvshow';
import Season from './components/seasons/Season';
import Episodes from './components/seasons/Episodes';
import './assets/scss/App.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
        <Route exact path="/episode/:idSeason/:idEpisode">
            <Episodes />
          </Route>
          <Route exact path="/season/:idSeason">
            <Season />
          </Route>
          <Route exact path="/">
            <Tvshow />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
