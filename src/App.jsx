import Login from './views/Auth/Login';
import Home from './views/Home/Home';
import Welcome from './views/Welcome/Welcome';

export default function App() {
  return (
    <main>
      <Welcome />
      <Login />
      <Home />
    </main>
  );
}
