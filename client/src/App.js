import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Components/Home/home';
import Landingpage from './Components/Landingpage/landingpage';
import Detail from './Components/Detail/detail';
import CreateVideogame from './Components/CreateVideogame/createvideogame'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path="/" component={Landingpage}/>
        <Route  exact path="/home"   component={Home} />
        <Route  exact path="/home/:id"   component={Detail} />
        <Route  exact path="/createvideogame"   component={CreateVideogame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
