import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './views/Auth/Login';
import Home from './views/Home/Home';
import Welcome from './views/Welcome/Welcome';
import Header from './components/Header/Header';

export default function App() {
  return (
    <main>
      <UserProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </main>
  );
}
