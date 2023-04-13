import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function ProtectedRoute({ children, ...rest }) {
  let auth = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
