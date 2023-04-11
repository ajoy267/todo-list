import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './views/Auth/Login';
import Home from './views/Home/Home';
import Welcome from './views/Welcome/Welcome';

export default function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/signup">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}
