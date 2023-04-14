import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ItemProvider } from './context/ItemContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './views/Auth/Login';
import Home from './views/Home/Home';
import Welcome from './views/Welcome/Welcome';
import Header from './components/Header/Header';

export default function App() {
  return (
    <>
      <UserProvider>
        <ItemProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route path="/signin">
                <Login />
              </Route>
              <Route path="/signup">
                <Login isSigningup />
              </Route>
              <ProtectedRoute exact path="/home">
                <Home />
              </ProtectedRoute>
            </Switch>
          </Router>
        </ItemProvider>
      </UserProvider>
    </>
  );
}
